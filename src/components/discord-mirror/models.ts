export interface Message {
  /* The datetime the message was sent */
  created: string;
  /* The content of the message */
  text: string;
  /* The users nickname within the channel at the time the message was sent */
  username: string;
  /* Whether the message should be displayed in the component. Useful for remove inappropriate content while preserving data about it being sent */
  visible: boolean;
}
