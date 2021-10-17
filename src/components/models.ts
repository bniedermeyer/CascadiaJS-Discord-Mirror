export interface Message {
  /* The datetime the message was sent */
  created: string;
  /* The content of the message */
  text: string;
  /* The users nickname within the channel at the time the message was sent */
  username: string;
  /* Whether the message should be displayed in the component. Useful for remove inappropriate content while preserving data about it being sent */
  visible: boolean;
  /* Optional - if included in the message the component will display the gif instead of the message text */
  gif?: {
    /* The url of a preview image. Used to display for users who enable reduced motion on their machines */
    preview: string;
    /* The url of the animated gif */
    gifUrl: string;
    /* The alt text of the gif */
    alt: string;
  };
}
