'use client';

import Form from "@/components/Form";
import Header from "@/components/Header";
import Tasks from "@/components/Tasks";

export default function Home() {
  return (
    <div className="max-w-[768px] mx-auto py-12">
      <Header />
      <main>
        <Form />
        <Tasks />
      </main>
    </div>
  );
}