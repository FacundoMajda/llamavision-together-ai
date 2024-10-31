import "dotenv/config";
import Together from "together-ai";

const together = new Together({
  apiKey: process.env.TOGETHER_API_KEY,
});

const getDescriptionPrompt =
  "Describe la imagen adjunta en detalle. Presta mucha atención a los colores, formas, objetos y cualquier texto presente en la imagen. Asegúrate de mencionar cada parte de la imagen y describe lo que ves con la mayor precisión posible.";

const imageUrl =
  "https://napkinsdev.s3.us-east-1.amazonaws.com/next-s3-uploads/d96a3145-472d-423a-8b79-bca3ad7978dd/trello-board.png";

async function main() {
  try {
    const response = await together.chat.completions.create({
      model: "meta-llama/Llama-Vision-Free",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: getDescriptionPrompt },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      stream: true,
    });

    for await (const chunk of response) {
      process.stdout.write(chunk.choices[0].delta.content || "");
    }
  } catch (error) {
    console.error("Fallo en respuesta del modelo:", error);
  }
}

main().catch(console.error);
