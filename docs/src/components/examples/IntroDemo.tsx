import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription } from '@templates/card';

export function IntroDemoCard() {
  return (
    <Card className="max-w-[400px] bg-white">
      <CardHeader>
        <CardTitle>Sketchy Card</CardTitle>
        <CardDescription>
          This border was drawn by a computer trying to be human.
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
