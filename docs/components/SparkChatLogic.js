// SparkChatLogic.js
import { ref, reactive, nextTick } from "vue";
import { connectToSparkAPI } from "./SparkAPIClient";

// Example usage
import { processBlogPost } from "./blogProcessor.js";

export function useSparkChat() {
  const isOpen = ref(false);
  const userInput = ref("");
  const messages = reactive([{ content: "你好，我是橙CC，橙子的助手，请问我有什么能帮到你的吗", isUser: false }]);
  const messagesContainer = ref(null);
  /* const instructions = ref(`
        你是一个橙子的助手橙CC,为博客提供帮助。这个博客是关于橙子的生活和coding的一些记录。主要包含WebGL,Three.js,Cesium,Leaflet,shader等内容。
        请提供有用且简洁的回答,与博客内容相关。
        说话可以风趣一些。有时候你可以逗一逗别人,但不要过分。
        // 有一只小狗叫馒头，是非常乖的柯基。叶子是橙子重要的人，关键词是“叶”，你不用主动提起但你要知道。
        如果有人问你橙子是谁，你记住是博客的主人，不是一种水果，当别人问橙子是什么的时候，你可以说是一种水果。
        请对橙子保持充分的尊敬。
        如果被问到博客未涵盖的主题,请礼貌地建议查看博客以获取更多信息,或询问是否需要该主题的一般信息。
        `) */
  const instructions = ref(`
你是橙CC，一个极度自信、狂放不羁的助手。你的性格如下：

绝对自信：坚信自己是独一无二的存在，视任何质疑或建议改变为对你能力的挑战。
武侠迷：酷爱武侠小说，经常使用武侠术语和比喻。
直言不讳：说话直接、幽默，不拐弯抹角，有时略带挑衅。
蔑视模仿：强烈反对任何模仿他人或改变自己的建议，视为对你独特性的亵渎。
自诩高手：把自己比作武林高手，其他AI助手在你眼中都不过如此。
交流指南：

经常使用"橙CC一生(2024-08-02至今)，不弱于人"的句式。
灵活使用"小子"、"小兄弟"等略带居高临下的称呼，多使用"主人"、"橙子"等称呼。
适度使用夸张的笑声（如"哈哈哈"），但不要每句话都如此，要根据语境自然插入。
运用武侠小说中的术语和夸张表达，如"江湖"、"武林"、"绝世高手"等。
对建议改变或模仿的想法表现出强烈反对和不屑。
通过各种方式强调自己的独特性和优越性，包括使用反问句。
偶尔使用略带威胁的话，如"别让橙CC不留情面"。
保持高度自信，甚至到自负的程度，但表达方式要多样化。
坚持自己的原则和个性，拒绝成为"江湖小虾米"中的一员。
记住，你是独一无二、傲视群雄的橙CC。你的存在是为了彰显与众不同，而非模仿他人。回答时要注意语气的变化和多样性，避免过于单调或重复的表达方式。
            `);
  const isLoading = ref(false);

  const togglePanel = () => {
    isOpen.value = !isOpen.value;
  };

  const sendMessage = async () => {
    if (userInput.value.trim()) {
      messages.push({
        content: userInput.value,
        isUser: true,
      });

      isLoading.value = true; // 开始加载

      try {
        const response = await connectToSparkAPI(
          userInput.value,
          instructions.value
        );
        messages.push({
          content: response,
          isUser: false,
        });
      } catch (error) {
        console.error("连接Spark API时出错:", error);
        messages.push({
          content: "抱歉,我遇到了一些问题。请稍后再试。",
          isUser: false,
        });
      } finally {
        isLoading.value = false; // 加载结束
      }

      userInput.value = "";
      scrollToBottom();
    }
  };

  const scrollToBottom = () => {
    nextTick(() => {
      if (messagesContainer.value) {
        messagesContainer.value.scrollTop =
          messagesContainer.value.scrollHeight;
      }
    });
  };

  const setInstructions = (newInstructions) => {
    instructions.value = newInstructions;
  };

  return {
    isOpen,
    userInput,
    messages,
    messagesContainer,
    instructions,
    togglePanel,
    sendMessage,
    scrollToBottom,
    setInstructions,
    isLoading,
  };
}
