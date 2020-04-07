export function drawText(
  context,
  content,
  x,
  y,
  x1,
  y1,
  noPadding,
  font,
  fontColor,
  alignHorizontal,
  alignVertical,
  isName
) {
  context.save();
  var horizontalAlign = "left";
  var verticalAlign = "top";
  var centerX;
  var centerY;
  var minusValueX = 0;
  var minusValueY = 0;
  var result;
  var temp;
  if (x > x1) {
    temp = x;
    x = x1;
    x1 = temp;
  }
  if (y > y1) {
    temp = y;
    y = y1;
    y1 = temp;
  }
  x = x - minusValueX;
  y = y - minusValueY;
  x1 = x1 - minusValueX;
  y1 = y1 - minusValueY;
  var rectangle = {};
  rectangle.left = x;
  rectangle.top = y;
  rectangle.width = x1 - x;
  rectangle.height = y1 - y;
  var padding = {
    left: 5,
    right: 5,
    top: 0,
    bottom: 0,
  };
  horizontalAlign = "center";
  verticalAlign = "middle";
  if (alignHorizontal) {
    horizontalAlign = alignHorizontal;
  }
  if (alignVertical) {
    verticalAlign = alignVertical;
  }
  if (content !== undefined && content !== null) {
    context.textAlign = horizontalAlign;
    var xValue = rectangle.left + padding["left"];
    var x1Value = x1 - padding["right"];
    var yValue = rectangle.top + padding["top"];
    var y1Value = y1 + padding["bottom"];
    //x1Value = Math.floor((xValue + x1Value) / 2);
    context.fillStyle = fontColor;
    context.font = font;
    drawMultiLineText(
      context,
      content,
      rectangle,
      xValue,
      x1Value,
      yValue,
      y1Value,
      verticalAlign
    );
    context.restore();
  }
}

export function drawMultiLineText(
  context,
  text,
  rect,
  x,
  x1,
  top,
  bottom,
  verticalAlign
) {
  context.save();
  var lines = text.split(/\r\n|\r|\n/);
  /**
  var fontMetrics = iv.grid.canvas.UtilFont.getMetrics(
    iv.grid.canvas.UtilFont.parse(font)
  );
  var fontHeight = fontMetrics["lineHeight"];
   */
  var font = context.font;
  var data = /\d+px/;
  var result = data.exec(font);
  var fontHeight =
    result && result.length > 0 ? parseInt(result[0].replace("px", "")) : 14;
  var height = fontHeight * lines.length;

  var yValue = top;
  if (verticalAlign === "middle") {
    yValue = Math.floor((top + bottom - height) / 2) + fontHeight * 0.5;
  } else if (verticalAlign === "bottom") {
    yValue = bottom - height;
  }
  context.textBaseline = verticalAlign;

  var index = 0;
  if (rect.top - yValue >= fontHeight) {
    index = Math.floor((rect.top - yValue) / fontHeight);
    yValue += index * fontHeight;
  }
  var textX = 0;
  for (var len = lines.length; index < len; index++) {
    if (context.textAlign === "left") {
      textX = x;
    } else if (context.textAlign === "right") {
      textX = x1;
    } else {
      textX = (x + x1) / 2;
    }
    if (yValue >= rect.top + rect.height) {
      break;
    }
    var line = lines[index];
    context.beginPath();
    context.fillText(line, textX, yValue);
    context.closePath();
    yValue += fontHeight;
  }
  context.restore();
}

export function wrapText(cxt, text, maxWidth) {
  if (cxt.measureText(text)["width"] < maxWidth) {
    return text;
  } else {
    var lines = text ? text.split("\n") : [""];
    var wrapText = "";
    lines.map((line) => {
      var words = line.split(/[ 　]/);
      var sentence = "";
      var wrappedText = "";
      words.map((word) => {
        if (cxt.measureText(sentence + word + " ")["width"] > maxWidth) {
          wrappedText = wrappedText + sentence + "\n";
          if (cxt.measureText(word)["width"] > maxWidth) {
            var wordd = "";
            var wrappedWord = "";
            word = word.split("");
            word.map((value, index) => {
              if (cxt.measureText(wordd + word[index])["width"] > maxWidth) {
                wrappedWord = wrappedWord + wordd + "\n";
                wordd = "-" + word[index];
              } else {
                wordd = wordd + word[index];
              }
            });
            wrappedText = wrappedText + wrappedWord;
            sentence = wordd + " ";
          } else {
            sentence = word + " ";
          }
        } else {
          sentence = sentence + word + " ";
        }
      });
      wrappedText = wrappedText + sentence;
      wrapText = wrapText + wrappedText.trim() + "\n";
    });
    return wrapText.trim();
  }
}
