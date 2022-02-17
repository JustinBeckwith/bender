import {v1 as Vision} from '@google-cloud/vision';

const vision = new Vision.ImageAnnotatorClient();

export const name = 'messageCreate';
export async function execute(interaction) {
  console.log(interaction);
  if (interaction.attachments) {
    for (const [_, att] of interaction.attachments) {
      if (att.url) {
        try {
          // best I can tell there's a race condition before the image at the given
          // url will be available.  
          await new Promise(r => setTimeout(r, 500));
          const [result] = await vision.annotateImage({
            image: {
              source: {
                imageUri: att.url
              }
            },
            features: [
              { type: 'TEXT_DETECTION'},
              { type: 'LABEL_DETECTION'}
            ]
          });
          const labels = result.labelAnnotations.map(x => x.description).join(', ');
          const text = result.fullTextAnnotation?.text || '';
          await interaction.reply(`Text: ${text}\n\nLabels: \n\t${labels}`);
        } catch (e) {
          console.error(e);
          await interaction.reply('There was an error reading this image :(');
        }
      }
    }
  }
}

// Example payload from `interaction`  
// '943250187344830544' => MessageAttachment {
//   attachment: 'https://cdn.discordapp.com/attachments/942661770840002571/943250187344830544/unknown.png',
//   name: 'unknown.png',
//   id: '943250187344830544',
//   size: 37074,
//   url: 'https://cdn.discordapp.com/attachments/942661770840002571/943250187344830544/unknown.png',
//   proxyURL: 'https://media.discordapp.net/attachments/942661770840002571/943250187344830544/unknown.png',
//   height: 232,
//   width: 558,
//   contentType: 'image/png',
//   description: null,
//   ephemeral: false
// }

// Example payload from `annotateImage`:
// See ./vision-api-example-response.json
