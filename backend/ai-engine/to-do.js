const { GoogleGenerativeAI } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
const apiKey = 'AIzaSyDi0nxGEVC5GNT2uft4r1A1IYgFcPwJ1TE'

const genAI = new GoogleGenerativeAI(apiKey);

// const userText = 'Oh man, I’ve got so much to do this week! Okay, first thing is to finish the report for work—deadline’s like, Wednesday or something. Then, I need to go buy groceries (eggs, milk, bread, maybe snacks?) tomorrow afternoon. Oh, and can’t forget to call Mom—her birthday’s coming up, I think it\'s on Friday. Also, gotta clean my room at some point… probably over the weekend? Let’s see… oh yeah, send that email to John about the project details. ASAP!'

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 0,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
    responseSchema: {
        type: "object",
        properties: {
            response: {
                type: "array",
                items: {
                    type: "object",
                    properties: {
                        title: {
                            type: "string"
                        },
                        description: {
                            type: "string"
                        },
                        due_date: {
                            type: "string"
                        }
                    },
                    required: [
                        "title"
                    ]
                }
            }
        },
        required: [
            "response"
        ]
    },
};

// async function run() {
//     const chatSession = model.startChat({
//         generationConfig,
//         history: [
//         ],
//     });
//
//     const result = await chatSession.sendMessage(userText);
//     console.log(result.response.text());
// }
//
// run();

async function generateToDoList(userText) {
    try{
        const chatSession=model.startChat({
            generationConfig,
        });
        const result = await chatSession.sendMessage(userText);
        return result.response.text();
    }
    catch (error) {
        console.error("Error in generative AI: ", error);
        throw new Error("failed to generate to do list");
    }
}

module.exports = {generateToDoList};
