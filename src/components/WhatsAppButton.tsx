export default function WhatsAppButton({ number }: { number: string }) {
  if (!number) return null;
  const message = encodeURIComponent("Hi! I saw your portfolio and would like to get in touch.");

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 rounded-full bg-[#25D366] text-white shadow-lg hover:scale-110 active:scale-95 transition-transform animate-wa-pulse"
    >
      <svg viewBox="0 0 32 32" className="w-8 h-8" fill="currentColor" aria-hidden="true">
        <path d="M16.001 3C9.373 3 4 8.373 4 15c0 2.386.665 4.62 1.82 6.529L4 29l7.671-1.789A11.94 11.94 0 0 0 16.001 27C22.628 27 28 21.627 28 15S22.628 3 16.001 3Zm0 21.818c-1.99 0-3.845-.58-5.404-1.578l-.388-.232-4.552 1.062 1.086-4.435-.253-.407A9.77 9.77 0 0 1 5.182 15c0-5.964 4.855-10.818 10.819-10.818S26.818 9.036 26.818 15 21.965 24.818 16.001 24.818Zm5.94-8.144c-.324-.163-1.918-.946-2.215-1.054-.297-.108-.513-.163-.729.163-.216.325-.837 1.054-1.026 1.271-.189.216-.378.243-.702.081-.324-.163-1.368-.504-2.606-1.607-.963-.858-1.613-1.918-1.802-2.242-.189-.325-.02-.5.143-.662.146-.146.324-.379.486-.568.163-.19.216-.325.324-.541.108-.216.054-.406-.027-.568-.081-.163-.729-1.756-.999-2.405-.263-.632-.53-.546-.729-.556l-.62-.011c-.216 0-.568.081-.865.406-.297.325-1.135 1.108-1.135 2.702s1.162 3.133 1.324 3.35c.163.216 2.287 3.492 5.542 4.897.774.334 1.378.534 1.849.684.777.247 1.484.212 2.043.129.623-.093 1.918-.784 2.19-1.541.27-.758.27-1.407.189-1.542-.081-.135-.297-.216-.622-.379Z" />
      </svg>
    </a>
  );
}
