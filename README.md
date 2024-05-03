# AIducation

### By Samuel Chen and Erica Lee
### [Demo Link](https://9000-monospace-aiducation-1714198325794.cluster-t23zgfo255e32uuvburngnfnn4.cloudworkstations.dev/?monospaceUid=633155)

## Inspiration

During our childhood, we utilized educational resources such as Kumon and Khan Academy to learn mathematics. While these platforms offered valuable instruction, they sometimes fell short in providing sufficient practice problems and clear explanations. Recognizing the potential of AI, we envisioned a solution that could generate unlimited practice problems accompanied by detailed explanations to enhance students' learning experiences.

## What it does

Our AIducation platform is designed for students in grades K-5 to practice math skills. Users can customize their practice session by selecting the grade level (K-5), the type of math problem (addition, subtraction, multiplication, or division), and the numerical format (whole numbers, fractions, or decimals). Based on these preferences, Gemini, our AI system, generates a math problem for the student to solve. After the student submits their answer, Gemini verifies it and provides an explanation as needed.

## How we built it

We built this web application using ViteJS, Bootstrap, and Google’s Gemini API. We also utilized Google's IDX for app development and workflow management.

## Challenges we ran into

- A challenge we faced was our lack of experience with front-end development. Consequently, we ran into various bugs. Examples include:
    - The chosen numerical format defaulted to whole numbers even if the selected format was a fraction or decimal. We resolved this using the `event.preventDefault` method.
    - HTML elements inside would not justify correctly. We resolved this using Bootstrap and CSS.
- Gemini would often output incorrect or nonsensical questions or explanations.

## What we learned

- We learned a lot about frontend development: JavaScript, HTML5, and Cascading Style Sheets.

## What's Next for AIducation

- Making a more accurate way to create and verify problems.
    - We can create our own numbers and verify them. This way we do not have to rely on Gemini to verify the answer.
    - Optimizing input to the Gemini API to create more sensible word problems and explanations.
- Inserting visual representation for problems and explanations using image generation.
- Expanding the scope and range of problems.
    - We would like to introduce a larger variety of questions that introduce concepts such as geometry and algebra.
    - We would like to expand the range of difficulty to middle and high school math.
- Expanding the genre of education.
    - Including subjects like the sciences (chemistry, biology, etc) and history.