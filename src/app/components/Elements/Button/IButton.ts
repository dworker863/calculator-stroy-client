export interface IButton {
  text: string;
  type: 'button' | 'submit' | 'reset';
  inline?: boolean;
  onClick?: () => void;
}

export interface IStyledButton {
  inline?: boolean;
  onClick?: () => void;
}
