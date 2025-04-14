export function createMatchGroups(users, maxAppearances = 2, groupSize = 4) {
    const appearances = {};
    users.forEach(user => appearances[user.id] = 0);
  
    // Generate all combinations of users
    const allPossibleGroups = getCombinations(users.map(u => u.id), groupSize);
    shuffleArray(allPossibleGroups);
  
    const validGroups = [];
  
    for (const group of allPossibleGroups) {
      if (group.every(u => appearances[u] < maxAppearances)) {
        validGroups.push(group);
        group.forEach(u => appearances[u]++);
  
        const everyoneDone = Object.values(appearances).every(count => count >= maxAppearances);
        if (everyoneDone) break;
      }
    }
  
    return validGroups;
  }
  
  // Helper: Get all combinations of a specific size
  function getCombinations(arr, size) {
    const result = [];
    function combine(start, combo) {
      if (combo.length === size) {
        result.push([...combo]);
        return;
      }
      for (let i = start; i < arr.length; i++) {
        combo.push(arr[i]);
        combine(i + 1, combo);
        combo.pop();
      }
    }
    combine(0, []);
    return result;
  }
  
  // Helper: Shuffle an array (Fisher-Yates)
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
  
  // Example usage
  const users = Array.from({ length: 10 }, (_, i) => `U${i + 1}`);
  const groups = createMatchGroups(users);
  
  groups.forEach((group, i) => {
    console.log(`Group ${i + 1}: [${group.join(', ')}]`);
  });
  