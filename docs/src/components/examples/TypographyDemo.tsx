import React from 'react';
import {
  Title,
  Subtitle,
  Heading3,
  Heading4,
  Paragraph,
  Blockquote,
  Caption,
  Small,
  InlineCode,
} from '@templates/typography';

export function TypographyDemo() {
  return (
    <div className="sketchy-ui flex flex-col gap-4">
      <Title>The Joke Tax Chronicles</Title>
      <Paragraph>
        Once upon a time, in a far-away land, there was a very peculiar king who
        instituted a &quot;Joke Tax.&quot; Anyone who told a joke that
        didn&apos;t make him laugh had to pay a gold coin.
      </Paragraph>
    </div>
  );
}

export function TypographyVariants() {
  return (
    <div className="sketchy-ui flex w-full max-w-2xl flex-col gap-8">
      <section>
        <Subtitle>Heading Levels</Subtitle>
        <div className="mt-4 flex flex-col gap-4">
          <Heading3>Level 3 Heading</Heading3>
          <Heading4>Level 4 Heading</Heading4>
        </div>
      </section>

      <section>
        <Subtitle>Text Styles</Subtitle>
        <div className="mt-4 flex flex-col gap-4">
          <Blockquote>
            &quot;A joke is a very serious thing.&quot; — Winston Churchill
          </Blockquote>
          <div className="flex items-center gap-2">
            <Small>Small text</Small>
            <Caption>Caption text</Caption>
            <InlineCode>npm install</InlineCode>
          </div>
        </div>
      </section>

      <section>
        <Subtitle>Font Families</Subtitle>
        <div className="mt-4 flex flex-col gap-4">
          <Paragraph font="virgil">
            This is the Virgil font (handwritten style).
          </Paragraph>
          <Paragraph font="normal">
            This is the default sans-serif font.
          </Paragraph>
        </div>
      </section>
    </div>
  );
}
