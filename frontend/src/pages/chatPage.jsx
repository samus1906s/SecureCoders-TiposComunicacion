import Chat from "../components/chat";

export default function ChatPage() {
    return (
        <div className="container mt-4">
            <h1 className="mb-4">Chat en tiempo real</h1>
            <Chat usuario="Técnico" />
        </div>
    );
}