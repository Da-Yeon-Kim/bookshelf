export const getLen = (text: string) => {
  // 공백 포함, 일반 글자 1점, 특수문자 0.5점
  const specialChars = text.match(/[^a-zA-Z0-9가-힣\s]/g) || [];
  const normalCharsLength = text.length - specialChars.length;
  return normalCharsLength + specialChars.length * 0.5;
};
