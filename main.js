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
let output = document.querySelector('.output');
let correct = document.querySelector('.outputCorrectness')


/*
* Handle question creation
*/
generate.onsubmit = async (ev) => {
  ev.preventDefault();
  correct.hidden = true;
  let gradeLevel = document.getElementById("gradeSelect");
  let problemType = document.getElementById("typeSelect");
  let numberType = document.querySelector('input[name="options"]:checked');
  let gradeVal = gradeLevel.value;
  let problemVal = problemType.value;
  let numberVal = numberType.value;

  //Check if grade level, type, and at least one number type is selected
  //Otherwise show error modal
  if (gradeVal === "Grade Level" || problemVal === "Type") {
    output.innerHTML = "Please select a grade level and problem type";
    return;
  }else{
    document.getElementById("answerInput").disabled = false;
    document.getElementById("submitButton").disabled = false;
  }

  // output.textContent = numberVal;

  try {
    // Assemble the prompt by combining the text
    let prompt = "Write a " + gradeVal + "grade level math word problem with " + problemVal + " using " + numberVal + " numbers";

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
  let answerInput = document.getElementById("answerInput");
  let answerText = answerInput.value;

  try {
    // Assemble the prompt by combining the text
    let prompt = "Is {" + answerText + "} a valid answer for the question " + output.innerHTML + "?";

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
    correct.innerHTML = md.render(response.text());
  } catch (e) {
    correct.innerHTML += '<hr>' + e;
  }
};

