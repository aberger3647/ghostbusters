export const getMatches = () => {
    const matches = localStorage.getItem('matches')
        ? JSON.parse(localStorage.getItem('matches'))
        : [];

    return matches;
};

export const saveMatches = (matchArr) => {
    if (matchArr.length) {
        localStorage.setItem('matches', JSON.stringify(matchArr));
    } else {
        localStorage.removeItem('matches');
    }
};

export const removeMatch = (match) => {
    const savedMatches = localStorage.getItem('matches')
        ? JSON.parse(localStorage.getItem('matches'))
        : null;

    if (!savedMatches) {
        return false;
    }

    const updatedMatches = savedMatches?.filter((savedMatches) => savedMatches !== match);
    localStorage.setItem('matches', JSON.stringify(updatedMatches));

    return true;
};