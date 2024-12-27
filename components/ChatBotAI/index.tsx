import Script from "next/script"



const ChatBotAI = () => {
    return (
      <>
        <Script src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"></Script>
        <df-messenger
          intent="WELCOME"
          chat-title="NewAgent"
          agent-id="3bd60149-61a1-4aa9-b5d4-a19e255e951b"
          language-code="vi"
        ></df-messenger>
      </>
    )
  }

export default ChatBotAI
