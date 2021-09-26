import { Component, Host, h, Prop, State } from '@stencil/core';
import { FirebaseService } from '../../utils/firebase.service';
import { Database, Unsubscribe, DataSnapshot, Query, query, ref, onValue, limitToLast, orderByChild } from 'firebase/database';
import {Message} from './models'

@Component({
  tag: 'discord-mirror',
  styleUrl: 'discord-mirror.css',
  shadow: true,
})
export class DiscordMirror {
  @Prop() url: string;
  @Prop() token: string;
  @State() messages: Message[] = [];
  fbService: FirebaseService;
  database: Database;
  messageQuery: Query;
  unsubscribe: Unsubscribe;

  componentWillLoad() {
    this.fbService = new FirebaseService(this.url, this.token);
    this.database = this.fbService.getDatabase()
    const dbRef = ref(this.database, 'messages');
    this.messageQuery = query(dbRef, orderByChild('created'), limitToLast(200));
    this.unsubscribe = onValue(this.messageQuery, (snapshot: DataSnapshot) => {
      if (snapshot.val() !== null) {
        const updatedMessages = (Object.values(snapshot.val()) as Message[]).filter(message => message.visible );
        console.log('updated messages', updatedMessages);
        this.messages = updatedMessages;
      }
    });
  }

  disconnectedCallback() {
    this.unsubscribe()
  }

  render() {
    return (
      <Host>
        <ul>
          {this.messages.map(message => (<li key={message.created}>
            <span class="username">{message.username}: </span>{message.text}</li>))}
        </ul>
      </Host>
    );
  }

}
