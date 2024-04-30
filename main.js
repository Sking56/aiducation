import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from "@google/generative-ai";
import MarkdownIt from 'markdown-it';
import { maybeShowApiKeyBanner } from './gemini-api-banner';
import './style.scss';
import * as bootstrap from 'bootstrap';

// 🔥 FILL THIS OUT FIRST! 🔥
// 🔥 GET YOUR GEMINI API KEY AT 🔥
// 🔥 https://g.co/ai/idxGetGeminiKey 🔥
let API_KEY = import.meta.env.VITE_API_KEY;

let answer = document.querySelector('form[name="answerForm"]');
let generate = document.querySelector('form[name="generateForm"]');
let promptInput = document.querySelector('input[name="answer"]');
let output = document.querySelector('.output');
let gradeLevel = document.getElementById("gradeSelect");
let problemType = document.getElementById("typeSelect");
let wholeNumber = document.getElementById("wholeSelect");
let fraction = document.getElementById("fractionSelect");
let decimals = document.getElementById("decimalSelect");


const dropdownElementList = document.querySelectorAll('.dropdown-toggle')
const gradeDropdown = [...dropdownElementList].map(dropdownToggleEl => new bootstrap.Dropdown(dropdownToggleEl))


/*
* Handle question creation
*/
generate.onsubmit = async (ev) => {
  ev.preventDefault();
  //Check if grade level, type, and at least one number type is selected
  //Otherwise show error modal
  let gradeVal = gradeLevel.value;
  let typeVal = problemsType.value;

  output.textContent = "Generating...";

  try {
    //$('.dropdown-toggle').dropdown()
    // Load the image as a base64 string
    // let imageUrl = form.elements.namedItem('chosen-image').value;
    // let imageBase64 = await fetch(imageUrl)
    //   .then(r => r.arrayBuffer())
    //   .then(a => Base64.fromByteArray(new Uint8Array(a)));

    // Assemble the prompt by combining the text with the chosen image
    let prompt = promptInput.value;

    // Call the gemini-pro-vision model, and get a stream of results
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-pro",
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
        },
      ],
    });

    const result = await model.generateContentStream(prompt);

    // Read from the stream and interpret the output as markdown
    let buffer = [];
    let md = new MarkdownIt();
    // for await (let response of result.stream) {
    //   buffer.push(response.text());
    //   output.innerHTML = md.render(buffer.join(''));
    // }
    let response = await result.response;
    output.innerHTML = md.render(response.text());
  } catch (e) {
    output.innerHTML += '<hr>' + e;
  }
};

answer.onsubmit = async (ev) => {
  ev.preventDefault();
  //Check valid answer or show error modal

};

