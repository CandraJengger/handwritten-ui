import React from 'react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@templates/tabs';

export function TabsDemo() {
  return (
    <div className="skeci-ui flex items-center justify-center p-8">
      <Tabs defaultValue="account" className="w-[400px]">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="password">Password</TabsTrigger>
        </TabsList>
        <TabsContent
          value="account"
          className="mt-4 border-2 border-[#333333] p-4"
        >
          <p className="text-sm text-[#666666]">
            Make changes to your account here. Click save when you&apos;re done.
          </p>
        </TabsContent>
        <TabsContent
          value="password"
          className="mt-4 border-2 border-[#333333] p-4"
        >
          <p className="text-sm text-[#666666]">
            Change your password here. After saving, you&apos;ll be logged out.
          </p>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export function TabsVariants() {
  return (
    <div className="skeci-ui flex w-full max-w-2xl flex-col gap-12">
      <section>
        <h4 className="mb-4 text-sm font-bold">Outline Variant</h4>
        <Tabs defaultValue="tab1" variant="outline">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent value="tab1" className="mt-4">
            Content for Tab 1
          </TabsContent>
          <TabsContent value="tab2" className="mt-4">
            Content for Tab 2
          </TabsContent>
        </Tabs>
      </section>

      <section>
        <h4 className="mb-4 text-sm font-bold">Filled Variant</h4>
        <Tabs defaultValue="tab1" variant="filled">
          <TabsList>
            <TabsTrigger value="tab1">Tab 1</TabsTrigger>
            <TabsTrigger value="tab2">Tab 2</TabsTrigger>
          </TabsList>
          <TabsContent
            value="tab1"
            className="mt-4 bg-[#333333] p-4 text-white"
          >
            Content for Tab 1
          </TabsContent>
          <TabsContent
            value="tab2"
            className="mt-4 bg-[#333333] p-4 text-white"
          >
            Content for Tab 2
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
