import styled from "@emotion/styled";
import { useTheme } from "@mui/material";
import { ChangeEvent } from "react";

const SentenceInput = styled.input`
  padding: 0 2px;
  margin: 0;
  border: none;
  /* added styles */
  font-family: inherit;
  font-size: inherit;
  position: absolute;
  vertical-align: top;
  top: 0;
  left: 0;
  width: 100%;
  background: transparent;
`;

const Label = styled.label`
  display: inline-block;
  position: relative;
  max-width: 300px;
  min-width: 2em;
  min-height: 1.4em;
  padding: 0 2px;
`;

const Template = styled.span`
  visibility: hidden;
  white-space: pre;
  /* max-width : could be wised to set a maximum width and overflow:hidden; */
`;

export interface ISentece {
  value: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function Sentence({ value, onChange, onBlur }: ISentece) {
  const theme = useTheme();
  return (
    <Label>
      <Template>{value}</Template>
      <SentenceInput
        style={{ color: theme.palette.text.primary }}
        type="text"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </Label>
  );
}
