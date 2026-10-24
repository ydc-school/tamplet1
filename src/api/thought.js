const thoughts = [
    "You can't change the whole world, and you certainly can't change other people, but you do have the ability to change yourself. You can have a positive impact in your job, the people with whom you work, and the entire organization...the choice is up to you.",
    "Once we hold a belief, it tends to stick with us for the rest of our lives, unless we challenge it.",
    "Most people are about as happy as they make up their minds to be.",
    "Positive anything is better than negative nothing.",
    "What you see is what you get!",
    "Don't cry because it is over. Smile because it happened.",
    "The real act of discovery consists not in finding new lands but seeing with new eyes.",
    "The sense of wonder—that is our sixth sense.",
    "Hope sees the invisible, feels the intangible, and achieves the impossible.",
    "We often spend so much time coping with problems along our path that we only have a dim or even inaccurate view of what's really important to us.",
    "Pessimists calculate the odds. Optimists believe they can overcome them.",
    "Researchers find that optimists live 19 percent longer than pessimists.",
    "Just keep swimming.",
    "I keep my mind focused on peace, harmony, health, love and abundance. Then, I can't be distracted by doubt, anxiety, or fear.",
    "No problem can be solved from the same level of consciousness that created it.",
    "The greater part of our happiness or misery depends on our disposition and not our circumstances.",
    "Everything can be taken from us but one thing—the last of the human freedoms—to choose one's attitude in any given circumstance.",
    "A cynical young person is almost the saddest sight to see because it means that he or she has gone from knowing nothing to believing in nothing.",
    "Watch your thoughts; they become words. Watch your words; they become actions. Watch your actions; they become habits. Watch your habits; they become character. Watch your character; it becomes your destiny.",
    "If we did all the things we are capable of doing we would literally astound ourselves.",
    "Never doubt that a small group of thoughtful, committed citizens can change the world. Indeed, it is the only thing that ever has.",
    "Martin Luther King did not say, 'I have a strategic plan.' Instead, he shouted, 'I have a dream,' and he created a crusade.",
    "There are only two ways to live your life. One is as though nothing is a miracle. The other is as though everything is a miracle.",
    "It must be borne in mind that the tragedy of life doesn't lie in not reaching your goal. It lies in having no goal to reach. It is not a calamity to die with dreams unfulfilled, but it is a calamity not to dream. It is not a disgrace not to reach the stars, but it is a disgrace not to have any stars to reach. Not failure, but low aim, is the real sin.",
    "We must be the change we wish to see in the world.",
    "The optimist proclaims that we live in the best of all possible worlds; and the pessimist fears this is true.",
    "A pessimist is one who makes difficulties of his opportunities. An optimist is one who makes opportunities of his difficulties.",
    "Even if you fall on your face, you're still moving forward.",
    "For myself, I am an optimist—it does not seem to be much use being anything else.",
    "Opportunities are usually disguised as hard work, so most people don't recognize them.",
    "The more I want to get something done, the less I call it work.",
    "Turbulence is life force. It is opportunity. Let's love turbulence and use it for change.",
    "Happiness depends upon ourselves.",
    "We have been taught to believe that negative equals realistic and positive equals unrealistic.",
    "Man is what he believes.",
    "The thing always happens that you really believe in; and the belief in a thing makes it happen.",
    "It's choice—not chance—that determines your destiny.",
    "Only I can change my life. No one can do it for me.",
    "A positive attitude may not solve all your problems, but it will annoy enough people to make it worth the effort.",
    "A strong, positive mental attitude will create more miracles than any wonder drug.",
    "Human beings, by changing the inner attitudes of their minds, can change the outer aspects of their lives.",
    "The words that enlighten the soul are more precious than jewels.",
    "In the middle of difficulty lies opportunity.",
    "Everyday I do my best for one more day.",
    "Eighty percent of success is showing up.",
    "No matter how cynical you get, it is impossible to keep up.",
    "Change your thoughts and you change your world.",
    "No pessimist ever discovered the secret of the stars, or sailed to an unchartered land, or opened a new doorway for the human spirit.",
    "The clock of life is wound but once and no man has the power to tell just when the hands will stop, at late or early hour. Now is the only time that you own. You must live, love, and work with a will. Place no faith in tomorrow; for the clock may then be still.",
    "While we cannot direct the wind, we can adjust the sails.",
    "The next frontier is not only in front of you—it's inside you.",
    "The gap between what can be imagined and what can be accomplished has never been smaller.",
    "Be the most curious and positive person you know.",
    "Don't speculate on what might happen...imagine what you can actually make happen.",
    "Many people get cynical about those who try to do good in the world. Do some good anyway.",
    "Never let the word 'impossible' stop you from pursuing what your heart and spirit tell you to do. Impossible things come true everyday.",
    "Believe in yourself. Believe in others. Believe in life.",
    "Make adversity your ally. Greatness is born during tough times and unexpected circumstances.",
    "Complain less, breathe more. Criticize less, create more. Worry less, laugh more. Fear less, hope more.",
    "Remember that the greatest reward you get for your efforts is not what you get for them, but what you become by them.",
    "The harder the wind blows, the higher your kite will fly.",
    "Optimistic people are strategically unrealistic.",
    "There's no sense being pessimistic. It probably wouldn't work anyway.",
    "Have an irrational sense of hope.",
    "The most important lessons often come where the road turns sharply.",
    "Keep learning from what life brings.",
    "Every stumble and turn is a lesson learned.",
    "Never underestimate the power of a kind word, an unexpected act of generosity, a courageous deed.",
    "On the path of life, few signs are big or clear. Just don't get fooled by the ones that say, 'You can't get there from here.'",
    "Don't settle for being what you used to be or have been. Keep reaching for what you can yet become.",
    "Stop competing, and start excelling. No one has to lose for you to win.",
    "Loosen up. Lighten up. Keep showing up.",
    "Remember, you'll never get new results from repeating old habits.",
    "Never forget your attitude and feelings always attract exactly what they convey.",
    "Never give up on life's possibilities.",
    "Work as if you have no need for money.",
    "Do whatever it takes to make a difference through your work.",
    "Align your daily efforts with big dreams and great goals.",
    "Value even the smallest moments of inspiration.",
    "Never forget from how far back a human being can come and still make a difference.",
    "Know that the biggest risk in life is not to risk at all.",
    "Live so that when other people think of integrity, enthusiasm, commitment, and caring, they think of you.",
    "Know you were born an original—to make a difference in the world."
]





function getDailyThought(thoughts) {
    if (!thoughts || thoughts.length === 0) {
        return null;
    }

    const today = new Date();

    const startOfYear = new Date(today.getFullYear(), 0, 0);
    const diff = today - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    const index = dayOfYear % thoughts.length;

    return thoughts[index];
}


const todaysThought = getDailyThought(thoughts);


export default todaysThought;