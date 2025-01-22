export function sumUserScores(userDocs) {
    return userDocs.reduce((sum, doc) => sum + doc.score, 0);
  }