export const links = [
  {
    id: 1,
    url: '/',
    text: 'Home',
  },

  {
    id: 2,
    url: '/movies',
    text: 'Movies',
  },

  {
    id: 3,
    url: '/tvshows',
    text: 'Series',
  },

  /* {
    id: 4,
    url: '/requests',
    text: 'Request',
  }, */

  {
    id: 5,
    url: '/groups',
    text: 'Groups',
  },
  {
    id: 6,
    url: '/filmquiz',
    text: 'Film Quiz',
  },

  /* {
    id: 11,
    url: '/admin',
    text: 'Admin',
  }, */
];

export const admin = [
  {
    id: 1,
    url: '/addmovie',
    text: 'Add movie',
  },
  {
    id: 2,
    url: '/addshow',
    text: 'Add show',
  },

  {
    id: 3,
    url: '/addquestion',
    text: 'Add Question',
  },

  {
    id: 4,
    url: '/addpost',
    text: 'Add Post',
  },
];

export const profile = [
  {
    id: 1,
    url: '/register',
    text: 'Register',
  },

  {
    id: 2,
    url: '/login',
    text: 'Login',
  },
];

export const urlPatterns = {
  youtube: '^(https?://)?(www.youtube.com|youtu.be)/.+$',
  facebook: '^(https?://)?(www.facebook.com)/.+$',
  whatsapp: '^(https?://)?(chat.whatsapp.com)/.+$',
  telegram: '^(https?://)?(t.me).+$',
  netflix: '^(https?://)?(www.netflix.com)/.+$',
  amazon: '^(https?://)?(www.primevideo.com|www.amazon.de)/.+$',
  hbo: '^(https?://)?(www.www.hbo.com)/.+$',
  disney: '^(https?://)?(www.disneyplus.com)/.+$',
  ifma: '^(https?://)?(www.ifmacinema.com)/.+$',
  sky: '^(https?://)?(www.sky.com|sky.de)/.+$',
  wow: '^(https?://)?(www.wowtv.de)/.+$',
  talkingmovies: '^(https?://)?(www.tkimovies.com)/',
};

export const indices = [
  {
    id: 1,
    text: 'Most anticipated movies',
    index: 'most anticipated',
  },
  {
    id: 2,
    text: 'Best Movies ',
    index: 'best',
  },

  {
    id: 3,
    text: 'Greatest Movies',
    index: 'greatest',
  },

  {
    id: 4,
    text: 'Romantic Movies',
    index: 'romance',
  },
  {
    id: 5,
    text: 'Golden Age classics',
    index: 'golden',
  },
  {
    id: 6,
    text: 'Animations',
    index: 'animation',
  },
  {
    id: 7,
    text: 'Best of Marvel',
    index: 'marvel',
  },
  {
    id: 8,
    text: 'Best of DC',
    index: 'dc',
  },
  {
    id: 9,
    text: 'Classic Nollywood',
    index: 'old',
  },
  {
    id: 10,
    text: 'Sci-fi Movies',
    index: 'scifi',
  },
  {
    id: 11,
    text: 'Classics',
    index: 'classics',
  },
  {
    id: 12,
    text: 'Action Movies',
    index: 'action',
  },
  {
    id: 13,
    text: 'Teen Movies',
    index: 'teen and high school',
  },
  {
    id: 14,
    text: 'Epic/Adventure/Fantasy Movies',
    index: 'adventure',
  },

  {
    id: 15,
    text: ' Inspirational Movies',
    index: 'inspirational',
  },

  {
    id: 16,
    text: 'Spy and Mystery movies',
    index: 'spy,detective, mystery',
  },
  {
    id: 17,
    text: 'Crying Movies',
    index: 'cry',
  },
  {
    id: 18,
    text: 'Comedy Movies',
    index: 'comedy',
  },
  {
    id: 19,
    text: 'Afro American Movies',
    index: 'black american',
  },
  {
    id: 20,
    text: 'Nostalgia',
    index: 'nostalgia',
  },
  {
    id: 21,
    text: 'Korean Movies',
    index: 'Korean',
  },
  {
    id: 22,
    text: 'Bollywood Movies',
    index: 'bollywood',
  },
  {
    id: 23,
    text: ' African Cinema',
    index: 'african, nollywood ',
  },

  {
    id: 24,
    text: 'Documentaries',
    index: 'documentary',
  },
  {
    id: 25,
    text: 'Intelligent Movies',
    index: 'intelligent',
  } /* ,
  {s
    id: 21,
    text: 'Best movies of 2019',
    index: '2019',
  },
  {
    id: 22,
    text: 'Best movies of 2018',
    index: '2018',
  },
  {
    id: 23,
    text: 'Best movies of 2017',
    index: '2017',
  }, */,
];

export const showDices = [
  {
    id: 1,
    text: 'most anticipated tv shows',
    index: 'most anticipated',
  },
  {
    id: 2,
    text: 'Greatest shows of All Time',
    index: 'greatest',
  },
  {
    id: 3,
    text: 'Best Adventure Tv Shows',
    index: 'adventure',
  },
  {
    id: 4,
    text: 'Best Marvel  Shows',
    index: 'marvel',
  },
  {
    id: 5,
    text: 'Best Shows on Netflix',
    index: 'netflix',
  },
  {
    id: 6,
    text: 'Best Shows on HBO',
    index: 'hbo',
  },
  {
    id: 7,
    text: 'Best Romantic Tv Shows',
    index: 'romance',
  },
  {
    id: 8,
    text: 'Best Shows on Amazon Prime',
    index: 'amazon',
  },
  {
    id: 9,
    text: 'Best Shows on Apple Plus',
    index: 'netflix',
  },
  {
    id: 10,
    text: 'Top Shows on Disney Plus',
    index: 'disney',
  },
  {
    id: 11,
    text: 'Best Documentaries ',
    index: 'action',
  },
  {
    id: 12,
    text: 'Best Sci-Fi Tv Shows ',
    index: 'scifi',
  },
  {
    id: 13,
    text: 'Best Action Tv Shows ',
    index: 'action',
  },

  {
    id: 14,
    text: 'Best African Tv Shows ',
    index: 'african',
  },
  {
    id: 15,
    text: 'Best Bollywood Tv Shows ',
    index: 'bollywood',
  },
  {
    id: 16,
    text: 'Best Korean Tv Shows ',
    index: 'korean',
  },
  {
    id: 17,
    text: 'Best Shows on Hulu',
    index: 'hulu',
  },
  {
    id: 18,
    text: 'Best Animated Series',
    index: 'animation',
  },
];

//Genres
export const genreList = [
  '',
  'action',
  'adventure',
  'animation',
  'biography',
  'comedy',
  'crime',
  'drama',
  'documentaries',
  'horror',
  'fantasy',
  'mystery',
  'musical',
  'noir',
  'romance',
  'spy',
  'sci-fi',
  'thriller',
  'war',
  'western',
];

//KeywordsList
export const keywordsList = [
  '',
  'best',
  'bollywood',
  'classics',
  'cry',
  'dc',
  'golden',
  'greatest',
  'inspirational',
  'intelligent',
  'korean',
  'marvel',
  'teen',

  'newafrica',
  'oldafrica',
];

//KeywordsList
export const keywordsListTv = [
  '',
  'netflix',
  'hbo',
  'amazon prime',
  'dc',
  'disney',
  'apple plus',
  'korean',
  'african',
  'marvel',
  'greatest',
  'best',
  'bollywood',
  'classics',
];

//Creators/Source
export const sources = [
  '',
  'IFMA',
  'Netflix',
  'Warner Bros.',
  'Lionsgate',
  'Sony Pictures',
  '20th Century Studios',
  'Penma50',
  'The Konversation',
  'Latest',
  'Disney',
  'Marvel Studios',
  'Dc Studios',
  'Epitonment',
  'A24',
  'DreamWorks Pictures',
  'Focus Features',
  'Magnolia Pictures',
  'New Line Cinema',
  'Weinstein Company',
  'Talking Movies',
];

export const myquestions = [
  {
    question: 'Who is the directed of Avtar ?',
    option: ['Steven Spielberg', 'James Cameron', 'Martin Scorsese'],
    correctAnswer: 'James Cameron',
    id: 1,
  },
  {
    question: 'What is the highest grossing movie in Hollywood ?',
    option: ['Avatar', 'Avengers', 'Titanic'],
    correctAnswer: 'Avengers',
    id: 2,
  },
  {
    question: 'What is the alter ego of Batman called ?',
    option: ['Bruce Wayne', 'Clerk Kent', 'Bruce Banner'],
    correctAnswer: 'Bruce Wayne',
    id: 3,
  },
  {
    question: 'Who was the first Black person to win an Oscar?',
    option: ['Hattie McDaniel', 'Sidney Poitier', 'James Earl Jones'],
    correctAnswer: 'Hattie McDaniel',
    id: 4,
  },
  {
    question:
      'What is the name of the fictional land where Frozen takes place?',
    option: ['Florin', 'Arendelle', 'Naples'],
    correctAnswer: 'Arendelle',
    id: 5,
  },
  {
    question: 'Which of these actors has never won an oscar',
    option: ['Leonardo Dicaprio', 'Lupita Nyongo', 'Samuel L. Jackson'],
    correctAnswer: 'Samuel L. Jackson',
    id: 6,
  },
  {
    question:
      'What are the dying words of Charles Foster Kane in Citizen Kane?',
    option: ['I love you', 'Rosebud', 'I will be back'],
    correctAnswer: 'Rosebud',
    id: 7,
  },
  {
    question: 'What was the first feature-length animated movie ever released?',
    option: [
      'Snow White and the Seven Dwarfs',
      'The Lion King',
      'Mickey Mouse',
    ],
    correctAnswer: 'Snow White and the Seven Dwarfs',
    id: 8,
  },
  {
    question: 'In The Matrix, does Neo take the blue pill or the red pill?',
    option: ['Blue', 'Red', 'Neither'],
    correctAnswer: 'Red',
    id: 9,
  },
  {
    question: "What's the name of the skyscraper in Die Hard?",
    option: ['Nakatomi Plaza', 'LA Plaza', 'Pent House Plaza'],
    correctAnswer: 'Nakatomi Plaza',
    id: 10,
  },
  {
    question:
      'What American writer/director starred in several iconic European-produced "Spaghetti Westerns"?',
    option: ['Martin Scorsese', 'Clint Eastwood', 'Quentin Tarantino'],
    correctAnswer: 'Clint Eastwood',
    id: 11,
  },
  {
    question:
      'In what 1976 thriller does Robert De Niro famously say "You talkin\' to me?"',
    option: ['The Godfather', 'Taxi Driver', 'The Casino'],
    correctAnswer: 'Taxi Driver',
    id: 12,
  },
  {
    question:
      'For what movie did Steven Spielberg win his first Oscar for Best Director?',
    option: ['Jaws', "Schindler's List", 'Saving Private Ryan'],
    correctAnswer: "Schindler's List",
    id: 13,
  },
  {
    question:
      'Who directed Parasite – the first foreign-language film to win the Academy Award for Best Picture?',
    option: ['Bong Joon-ho', 'John Woo', 'Kim Jee-woon'],
    correctAnswer: 'Bong Joon-ho',
    id: 14,
  },
  {
    question: 'What Hollywood movie star plays himself in Zombieland?',
    option: ['Samuel L. Jackson', 'Bill Murray', 'Amber Heard'],
    correctAnswer: 'Bill Murray',
    id: 15,
  },
  {
    question:
      "In 2013, Lupita Nyong'o became the first Kenyan and Mexican actress to win an Academy Award – which film did she win it for?",
    option: ['Queen of Katwe', 'Us', '12 Years A Slave'],
    correctAnswer: '12 Years A Slave',
    id: 16,
  },
  {
    question:
      'For which 1964 musical blockbuster did Julie Andrews win the Academy Award for Best Actress?',
    option: ['The Sound Of Music', 'Cinderella', 'Mary Poppins'],
    correctAnswer: 'Mary Poppins',
    id: 17,
  },
  {
    question:
      'Which movie was incorrectly announced as the winner of Best Picture at the 2017 Academy Awards, during the greatest Oscars flub of all time?',
    option: ['Get Out', 'Wonder', 'La La Land'],
    correctAnswer: 'La La Land',
    id: 18,
  },
  {
    question:
      'Aaron Sorkin won an Oscar for writing what 2010 drama about the creation of Facebook?',
    option: ['Shutter Island', 'Money Ball', 'The Social Network'],
    correctAnswer: 'The Social Network',
    id: 19,
  },
  {
    question:
      'Joaquin Phoenix received his first Oscar nomination for playing Roman emperor Commodus in what 2000 Oscar-winning epic?',
    option: ['Gladiator', 'The Yards', 'The Master'],
    correctAnswer: 'Gladiator',
    id: 20,
  },
  {
    question:
      'What is the title of the first film in the Fast and Furious franchise?',
    option: [
      '2 Fast 2 Furious',
      'The Fast and The Furious',
      'The Turbo Charged',
    ],
    correctAnswer: 'The Fast and The Furious',
    id: 21,
  },
  {
    question:
      'what was the last fast and furious film, Paul Walker appeared in before his passing  in 2015 ?',
    option: ['Fast Five', 'Furious 7', 'Fast & Furious 6'],
    correctAnswer: 'Furious 7',
    id: 22,
  },
  {
    question: 'Which of these movies is starring Heath Ledger ?',
    option: ['The Dark Knight Rises', "A Knight's Tale", 'Gone in 60 Seconds'],
    correctAnswer: "A Knight's Tale",
    id: 23,
  },
  {
    question:
      'The Battle of Thermopylae served as the basis of what highly stylized 2006 smash hit swords-and-sandals action flick?',
    option: ['Apocalypto', '300', 'Prince of Persia'],
    correctAnswer: '300',
    id: 24,
  },
  {
    question:
      'Which Alfred Hitchcock thriller is notorious for its shocking "shower scene"?',
    option: ['Rear Window', 'To Catch a Thief', 'Psycho'],
    correctAnswer: 'Psycho',
    id: 25,
  },
  {
    question:
      "Three of Jim Carrey's blockbusters—The Mask, Dumb and Dumber and Ace Ventura: Pet Detective—were all released in what year?",
    option: ['1994', '1995', '1996'],
    correctAnswer: '1994',
    id: 26,
  },
  {
    question:
      'Who is the first and only woman of color to win the Oscar for Best Actress?',
    option: ['Viola Davis', 'Halley Berry', 'Angela Bassett'],
    correctAnswer: 'Halley Berry',
    id: 27,
  },
  {
    question:
      'Which movie character is associated with the phrase "I drink and I know things" ?',
    option: ['The Godfather', 'Tyrion Lannister', 'Tywin Lannister'],
    correctAnswer: 'Tyrion Lannister',
    id: 28,
  },
  {
    question:
      'In which animated fantasy film is the following dialogue from ?\n"Give him a gold piece and send him home, he has a story to tell ..."',
    option: ['Afro Sumurai', 'Beowulf', 'Soul'],
    correctAnswer: 'Beowulf',
    id: 29,
  },
  {
    question: 'How many Oscars has Meryl Streep won?',
    option: ['1', '2', '3'],
    correctAnswer: '3',
    id: 30,
  },
  {
    question: "What is the name of Riley's imaginary friend in Inside Out?",
    option: ['Toto', 'Bing Bong', 'Luna'],
    correctAnswer: 'Bing Bong',
    id: 32,
  },
  {
    question:
      'What internationally esteemed Malaysian actress has starred in a Bond film, Crouching Tiger, Hidden Dragon, Crazy Rich Asians, Shang-Chi and the Legend of the Ten Rings and more?',
    option: ['Michelle Chen', 'Michelle Lee', 'Michelle Yeoh'],
    correctAnswer: 'Michelle Yeoh',
    id: 33,
  },
  {
    question:
      'What is the first fantasy movie to win Best Picture at the Oscars?',
    option: [
      'Harry Potter',
      'The Lord of the Rings: The Return of the King',
      '300',
    ],
    correctAnswer: 'The Lord of the Rings: The Return of the King',
    id: 34,
  },
  {
    question:
      'Who won Best Supporting Actor Oscars for both Moonlight and Green Book?',
    option: ['Mahershala Ali', 'Naomie Harris', 'Viggo Mortensen'],
    correctAnswer: 'Mahershala Ali',
    id: 35,
  },
  {
    question:
      "What is the name of the fictional boy band in Pixar's 2022 animation film - Turning Red?",
    option: ['Cool boys', '4*Town', 'New Kids on The block'],
    correctAnswer: '4*Town',
    id: 36,
  },
  {
    question:
      'How many angry men are there in the 1957 American courtroom drama film directed by Sidney Lumet?',
    option: ['7', '10', '12'],
    correctAnswer: '12',
    id: 37,
  },
  {
    question: 'After which movie did the sale of pet rats increase rapidly?',
    option: ['Flushed Away', 'Ratatouille', 'Mouse Hunt'],
    correctAnswer: ' Ratatouille',
    id: 38,
  },
  {
    question:
      'Name the 2015 film spinoff to the Rocky series starring Michael B. Jordan',
    option: ['Just Mercy', 'Creed', 'Black Panther'],
    correctAnswer: 'Creed',
    id: 39,
  },
  {
    question:
      'How many films have Kate Winslet and Leonardo DiCaprio starred in together?',
    option: ['1', '2', '3'],
    correctAnswer: '2',
    id: 40,
  },
  {
    question: "Who plays king T'Challa in 2018 superhero film Black Panther?",
    option: ['Michael B. Jordan', 'Chadwick Boseman', 'Daniel Kaluuya'],
    correctAnswer: 'Chadwick Boseman',
    id: 41,
  },
  {
    question: "Whats the title of Daniel Craig's first James Bond film ?",
    option: ['Specter', 'Skyfall', 'Quantum of Solace'],
    correctAnswer: 'Quantum of Solace',
    id: 42,
  },
  {
    question:
      '‘Frankly my dear, I don’t give a damn’ is an iconic line from which classic film?',
    option: ['All About Eve', 'Strangers On a Train', 'Gone With The Wind'],
    correctAnswer: 'Gone With The Wind',
    id: 43,
  },
  {
    question:
      'What game does Rachel play with Nick\'s mom at the end of "Crazy Rich Asians"?',
    option: ['Pin Pong', 'Mahjong', 'Chess'],
    correctAnswer: 'Mahjong',
    id: 44,
  },
  {
    question:
      'Which actress plays Ryan Gosling\'s character\'s love interest in "Crazy, Stupid, Love"?',
    option: ['Emma Stone', 'Rachel Mcadams', 'Jennifer Lawrence'],
    correctAnswer: 'Emma Stone',
    id: 45,
  },
  {
    question: 'What is Elle and Lee\'s favorite game in "The Kissing Booth"?',
    option: ['Dance Dance Revolution', 'Hula Hoop', 'Kissing'],
    correctAnswer: 'Dance Dance Revolution',
    id: 46,
  },
  {
    question: "Who destroys Thor's hammer?",
    option: ['Loki', 'Thanos', 'Hela'],
    correctAnswer: 'Hela',
    id: 47,
  },
  {
    question: "What metal is Wakanda's most precious resource?",
    option: ['Iron', 'Vibranium', 'Steel'],
    correctAnswer: 'Vibranium',
    id: 48,
  },
  {
    question: 'Which James Bond movie was the first for Pierce Brosnan as 007?',
    option: ['Die Another Day', 'Tomorrow Never Comes', 'Golden Eye'],
    correctAnswer: 'Golden Eye',
    id: 49,
  },
  {
    question: 'How many Oscars did the film Schindler’s List win?',
    option: ['1', '4', '7'],
    correctAnswer: '7',
    id: 50,
  },
  {
    question: 'Which Disney princess dresses up as a man to save her father?',
    option: ['Jasmine', 'Merida', 'Mulan'],
    correctAnswer: 'Mulan',
    id: 51,
  },
  {
    question: 'What is Indiana Jones’ weapon of choice?',
    option: ['A Gun', 'A Sword', 'A Whip'],
    correctAnswer: 'A Whip',
    id: 52,
  },
  {
    question: 'Who was the first solo female host of the Oscars?',
    option: ['Demi Moore', 'Whoopi Goldberg', 'Julia Roberts'],
    correctAnswer: 'Whoopi Goldberg',
    id: 53,
  },
  {
    question: 'How many times has the movie A Star is Born been remade?',
    option: ['2', '3', '4'],
    correctAnswer: '4',
    id: 54,
  },
  {
    question:
      "What does 'Dracarys' mean in Dothraki from the critical acclaim tv show Game of Thrones?",
    option: ['Dragon Strike', 'Dragon Fire', 'Dragon Ice'],
    correctAnswer: 'Dragon Fire',
    id: 55,
  },
  {
    question: 'Who starred as Private Ryan in the movie Saving Private Ryan?',
    option: ['Mark Wahlberg', 'Matt Damon', 'Tom Hanks'],
    correctAnswer: 'Matt Damon',
    id: 56,
  },
  {
    question:
      'What is the youngest child’s name in the von Trapp family in the film The Sound of Music?',
    option: ['Marta', 'Gretl', 'Brigitta'],
    correctAnswer: 'Gretl',
    id: 57,
  },
  {
    question:
      'In which country was the classic musical The Sound of Music filmed ?',
    option: ['Nazi Germany', 'Austria', 'Vienna'],
    correctAnswer: 'Austria',
    id: 58,
  },
  {
    question: 'How long did Forrest run in the film, Forrest Gump?',
    option: [
      '3 years & 2 months',
      '3 years',
      '3 years, 2 months, 14 days, & 16 hours',
    ],
    correctAnswer: '3 years, 2 months, 14 days, & 16 hours',
    id: 59,
  },
  {
    question: 'In Back to the Future, what type of car is the time machine?',
    option: [' Convertible', ' Benz', ' DeLorean'],
    correctAnswer: ' DeLorean',
    id: 60,
  },
  {
    question:
      'Which 2018 film features the actor John Krasinski starring alongside his real-life wife, Emily Blunt?',
    option: ['Fantastic Four', 'A Quiet Place', 'Girl On A Train'],
    correctAnswer: 'A Quiet Place',
    id: 61,
  },
  {
    question:
      'Which of these actresses is not starring in the movie Hidden Figures ?',
    option: ['Taraji P. Henson', 'Janelle Monáe', 'Viola Davis'],
    correctAnswer: 'Viola Davis',
    id: 62,
  },
  {
    question:
      'Which of these actors portrayed the characters Randy Watson, Clarence and Saul in the 1988 classic comedy Coming To America ? ',
    option: ['Arsenio Hall', 'John Amos', 'Eddie Murphy '],
    correctAnswer: 'Eddie Murphy ',
    id: 63,
  },
];
