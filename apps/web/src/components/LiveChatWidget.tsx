"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { io, type Socket } from "socket.io-client";

interface ChatMessage {
  user: string;
  text: string;
  createdAt?: string;
}

export function LiveChatWidget() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [draft, setDraft] = useState("");
  const socketUrl = useMemo(() => process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:4000", []);

  useEffect(() => {
    const socket: Socket = io(socketUrl, { transports: ["websocket"] });
    socket.on("chat:message", (message: ChatMessage) => {
      setMessages((prev) => [...prev.slice(-19), message]);
    });

    return () => socket.disconnect();
  }, [socketUrl]);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (!draft.trim()) return;

    const socket = io(socketUrl);
    socket.emit("chat:message", { user: "Student", text: draft.trim() });
    socket.disconnect();
    setDraft("");
  };

  return (
    <section className="rounded-lg border bg-white p-4 shadow-sm" aria-label="Live chat support">
      <h3 className="text-lg font-semibold text-brand-slate">Live Chat</h3>
      <div className="mt-3 h-40 overflow-y-auto rounded border p-2 text-sm">
        {messages.length === 0 ? <p className="text-slate-500">Support will reply shortly.</p> : null}
        {messages.map((message, idx) => (
          <p key={`${message.text}-${idx}`} className="mb-1">
            <span className="font-semibold">{message.user}: </span>
            {message.text}
          </p>
        ))}
      </div>
      <form className="mt-2 flex gap-2" onSubmit={onSubmit}>
        <input
          className="flex-1 rounded border px-2 py-1"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Type message"
          aria-label="Type message"
        />
        <button className="rounded bg-brand-teal px-3 py-1 text-white" type="submit">
          Send
        </button>
      </form>
    </section>
  );
}
