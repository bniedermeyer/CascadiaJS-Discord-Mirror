import { Component, Host, h, Prop, State, Watch } from '@stencil/core';
import { FirebaseService } from '../../utils/firebase.service';
import { Database, Unsubscribe, DataSnapshot, Query, query, ref, onValue, limitToLast, orderByChild, enableLogging } from 'firebase/database';
import { Message } from '../models';
import { MessageContent } from '../message-content/message-content';

@Component({
  tag: 'discord-mirror',
  styleUrl: 'discord-mirror.css',
  shadow: true,
})
export class DiscordMirror {
  /** The URL of the Firebase Realtime Database to pull data from */
  @Prop() url: string;
  /** If read protection is enabled in your database, the Firebase project's Web API Key */
  @Prop() token: string;
  /** If false, will not apply any text styling. See https://stenciljs.com/docs/styling#things-to-remember-with-shadow-dom for help styling from consuming applications */
  @Prop() useStyles: boolean = true;
  /** The HighlightJS theme to apply to markdown. Must have `useStyles` enabled */
  @Prop() highlightTheme: string = 'atom-one-dark';
  /** Whether or not auto scroll is active for the user */
  @State() scrollToLatest = true;
  /** The current messages rendered */
  @State() messages: Message[] = [];
  /** Temporary story of messages that are received while the user is scrolling */
  tempMessages: Message[] = [];
  /** The start of the chat message list */
  startOfChat!: HTMLElement;
  /** A reference to an invisible element at the end of the chat. This is used to scroll to the latest messages */
  endOfChat!: HTMLElement;
  /** The Firebase service */
  fbService: FirebaseService;
  /** Firebase Realtime Database Ref */
  database: Database;
  /** The query to run against the database */
  messageQuery: Query;
  /** Unsubscribe callback that is given when subscribing to Firebase. Call this to stop receiving new data */
  unsubscribeFromDb: Unsubscribe;
  /** An IntersectionObserver to track whether the user has scrolled further up in chat history */
  observer: IntersectionObserver;

  componentDidLoad() {
    this.fbService = new FirebaseService(this.url, this.token, Boolean(this.token));
    this.database = this.fbService.getDatabase();
    // enableLogging(true);
    const dbRef = ref(this.database, '/messages');
    // build the query that we want to run against the database and subscribe to updates
    // TODO: look into using virtual scrolling so we don't have to limit messages
    this.messageQuery = query(dbRef, orderByChild('created'), limitToLast(300));
    this.unsubscribeFromDb = onValue(this.messageQuery, (snapshot: DataSnapshot) => {
      if (snapshot.val() !== null) {
        const updatedMessages = (Object.values(snapshot.val()) as Message[])
          .filter(message => message.visible)
          .sort((a, b) => new Date(b.created).getTime() - new Date(a.created).getTime());

        // only scroll to the latest if the user is not scrolling
        if (this.scrollToLatest) {
          this.messages = updatedMessages;
        } else {
          // store these to add back to the list when the user scrolls to the bottom of the chat
          this.tempMessages = updatedMessages;
        }
      }
    });

    setTimeout(() => {
      // wait 1 sec before initializing scroll observer to ensure content is loaded and scrolled to
      this.initScrollObserver();
    }, 1000);
  }

  disconnectedCallback() {
    // Remove all listeners
    this.unsubscribeFromDb();
    this.observer.unobserve(this.endOfChat);
  }

  initScrollObserver() {
    const options = {
      root: this.startOfChat,
      threshold: 0,
    };
    // this observer watches to see when the use scrolls away from the chat and disables chat updates during that time
    this.observer = new IntersectionObserver(entries => {
      this.scrollToLatest = entries.some(entry => entry.isIntersecting);
    }, options);
    this.observer.observe(this.endOfChat);
  }

  @Watch('scrollToLatest')
  watchScrollToLatest(newValue: boolean) {
    if (newValue === true && this.tempMessages.length > 0) {
      // Add the messages the user missed back to the chat window
      this.messages = [...this.tempMessages];
      this.tempMessages = [];
    }
  }

  render() {
    return (
      <Host>
        <ul ref={el => (this.startOfChat = el as HTMLElement)} class={`message-container ${this.useStyles ? 'with-styles' : ''}`}>
          {/* we use flexbox column-reverse so this needs to come first to ensure it's at the end of the chat window */}
          <li id="end" aria-hidden="true" ref={el => (this.endOfChat = el as HTMLElement)}></li>
          {this.messages.map(message => (
            <li key={message.created}>
              <div class="message" part="message">
                <div class="username" part="username">
                  {message.username}:
                </div>
                <MessageContent message={message} />
              </div>
            </li>
          ))}
        </ul>
        {this.useStyles && <link rel="stylesheet" href={`https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.2.0/styles/${this.highlightTheme}.min.css`} />}
      </Host>
    );
  }
}
