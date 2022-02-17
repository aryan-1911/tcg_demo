import {
  DepositRoute,
  DisputeRoute, RegistrationRoute
} from 'const';
import {
  GameFormats,
  GameTypes,
  IMatch,
  MatchStatus,
  MatchTypes
} from 'interfaces';

export const gameCardData: IMatch = {
  id: '0',
  gamename: 'MTG Arena',
  entry: 10,
  format: GameFormats.FORMAT_CUSTOM,
  type: MatchTypes.TYPE_BEST_OF_1,
  prize: 17,
  game: GameTypes.arena,
  rule: '',
  avatar:
    'https://proprikol.ru/wp-content/uploads/2020/03/sinij-czvet-krasivye-kartinki-1-650x433.jpg',
  username: 'Nick99',
  created: {
    date: new Date().toString(),
    timezone: '',
    timezone_type: 0,
  },
  userId: '0',
  status: MatchStatus.open,
  winner: null,
};

export const subjectsArr = [
  {
    value: 'other',
    label: 'Other',
  },
  {
    value: 'question',
    label: 'Question',
  },
];

export const sliderMarks = [
  {
    value: 1,
    label: '1',
  },
  {
    value: 50,
    label: '5',
  },
  {
    value: 100,
    label: '10',
  },
];

export const inGameNames = [
  {
    gameName: 'POKEMON TCGO',
    key: GameTypes.pokemon,
  },
  {
    gameName: 'MTG ARENA',
    key: GameTypes.arena,
  },
  {
    gameName: 'YU-GI-OH MASTER DUEL',
    key: GameTypes.duel,
  },
  {
    gameName: 'Magic The Gathering Online',
    key: GameTypes.magic,
  },
];

export const faqsBasic = [
  {
    title: 'What is TCG Showdown?',
    description:
      'TCG Showdown is a Social TCG gaming website that specialize in overseeing all online matches and allow players to win real cash!',
  },
  {
    title: 'How do I sign up?',
    description: `You can sign up for TCG Showdown by`,
    link: RegistrationRoute.ROOT,
    linkText: ' clicking here',
  },
  {
    title: 'Does TCG Showdown charge for signing up?',
    description: 'TCG Showdown is free to sign up.',
  },
  {
    title: 'Is TCG showdown legal?',
    description:
      'TCG Showdown is legal, given that the card games we oversee are games of skill.',
  },
  {
    title: 'Can anybody play?',
    description:
      'Unfortunately, if you live in one of the following states, you may not sign upfor TCG Showdown as they have banned skill-based competitions for cash:Alaska, Arizona, Colorado, Delaware, Lowa, Maryland,North Dakota,Tennessee, and Vermont',
  },
  {
    title: 'How old do I have to be to compete on TCG Showdown?',
    description:
      'All players must be 18 years or older to compete on TCG Showdown.',
  },
  {
    title: 'What games can I play on TCG Showdown',
    description:
      'We currently offer Magic the gathering arena, Pokémon Online, Yu-Gi-Oh duel links. We are working hard to add more games soon.',
  },
  {
    title: 'Is TCG Showdown secure?',
    description:
      'TCG Showdown places the highest concern on making sure your private information is protected.  Our servers are highly secured with robust encryption.',
  },
  {
    title: 'Can I have more than one account on TCG Showdown?',
    description:
      'NO> You are only allowed to complete on TCG Showdown under one account. This is to protect the security of the site and the verification of our players. If you create a 2nd account, you will get a IP ban.',
  },
  {
    title: 'TCG Showdown Harassment Policy',
    description:
      'We understand that things can get heated in matches and that shit talking can be done in good fun. However, we have absolutely zero tolerance of racist, homophobic, hateful language, or otherwise discriminatory behavior. If you are saying anything along these lines, you will get an IP ban from TCG Showdown.',
  },
  {
    title: 'What if a player harasses a player after a match?',
    description:
      'If you harass or bother a player after a match, you will be suspended from TCG Showdown. We want you to have fun, but make sure you do it in a respectful way.',
  },
];

export const faqsMoney = [
  {
    title: ' How much are entry fees to play?',
    description: 'Our entry fees vary, but the minimum entry fee is $1.00',
  },
  {
    title: 'If I won, when will I get my earnings.',
    description: 'All earnings and losses from matches are instantaneous',
  },
  {
    title: 'What is the TCG Showdown service fee?',
    description:
      'CG Showdown charges a flat 15% service fee from all entry fees from all matches and tournaments.  i.e: $10 entry fee = $1.5 fee from each player.',
  },
  {
    title: 'What games can I play on TCG showdown?',
    description:
      'We currently offer Magic the gathering, Pokémon, andYu-gi-oh. We are working hard to add more games.',
  },
  {
    title: 'How to deposit money to play?',
    description: 'You can add funds to your account by',
    link: DepositRoute.ROOT,
    linkText: ' clicking here',
  },
  {
    title: 'How to withdraw money from my account?',
    description:
      'We use PayPal for all withdraws. You can withdraw your funds from your account by',
    link: DepositRoute.ROOT,
    linkText: ' clicking here.',
  },
  {
    title: 'How long does withdrawing funds take? ',
    description:
      'When you withdraw from your digital currency, please wait up to 2 to 3 business days to receive your funds via PayPal',
  },
  {
    title: 'Why do you need my personal information?',
    description:
      'If you make $600 or more within one year on TCG Showdown. We are required to send you a tax form 1099-misc. This form is from the IRS showing where your money came from.',
  },
  {
    title: 'How do I get this 1099-misc form?',
    description:
      'If you meet the $600 limit or more. We will mail out the form in January for your taxes.',
  },
  {
    title: 'What is the difference between username and in-game name?',
    description:
      'Username is their TCG Showdown ID. This is used for all internal actions inside of TCG Showdown like creating match, messaging, disputes, etc… ' +
      'The “in-game name” is the ID for the trading card game itself. This is used to find your opponent inside the game. ',
  },
];

export const faqsMatches = [
  {
    title: 'Match setup',
    description:
      'You can customize your match with detail. Before accepting any match, please remember to read all the match rules.',
  },
  {
    title: 'Custom Rule policy',
    description:
      'When creating custom rules, please be specific about the rules. Subjective rules are not allowed. ' +
      'Example: “no try hard decks” These rules are hard to enforce. ' +
      'If you put a subjective rule in your match, you will not win a dispute if a problem occurs that deals with the custom rule. ' +
      'Example of a good custom rule: “No Ultra-rare cards”',
  },
  {
    title: 'What if my opponent does not follow the match rules I set?',
    description:
      'If you or your opponent are not following the rules set on TCG Showdown’s match. ' +
      'You will need to stop playing immediately and take evidence. ' +
      'Do not finish the match. Create a dispute. If we find that rules were not being followed, then the match will be voided, and money refunded. ',
  },
  {
    title:
      'How do I find my opponent “in-game name” after accepting the match?',
    description:
      'You will be able to copy your opponents “in-game name” on the pop-up after accepting the match',
  },
  {
    title: 'What if my opponent’s “in-game name” does not match?',
    description:
      'If you receive an invitation on your game that does not match the in-game name from TCG Showdown.  DO NOT play that invite. If you play the invite you will be subject to a dispute as you will be late to your real match.',
  },
  {
    title: 'Tardiness',
    description:
      'It is your responsibility to NOT BE LATE.  If your opponent is 10 mins or more late.  Please provide your evidence and we will void the match and refund both player’s money',
  },
  {
    title: 'How to submit my results for my match? ',
    description:
      'We have a easy to use result system. After you are finished with your game, go to TCG Showdown, and record your results.',
  },
  {
    title: 'What if my opponent does not submit their results?',
    description:
      'If your opponent’s fails to report their results within 10 mins after you submit your results. ' +
      'TCG Showdown will go with the results that were submit even if their wrong, so It is especially important to submit your results right away. ',
  },
  {
    title: 'Evidence',
    description:
      'This is the most important thing to remember. ' +
      'DO NOT FORGET TO RECORD EVIDENCE! This can be in the form of video recording or screen shot. Your chances of winning a dispute increase exponentially if you have proper Evidence',
  },
  {
    title: 'What is a time stamp?',
    description:
      'Time stamp is a live stamp on the video or screen shot that shows the date and time that the video or screen shot was taken.  ' +
      'The time stamp needs to be original. We do not accept evidence with no time stamps or time stamps that has been digitally edited on to the video or screen shot. ',
  },
  {
    title: 'Do I need to submit a deck list?',
    description:
      'We do not ask for deck lists for matches. It is your responsibility to make sure that your opponents cards match the rules that were set. ' +
      'Using cards outside the rules/format that was selected is cheating and can get you a IP ban from TCG Showdown.',
  },
];

export const faqsReMatches = [
  {
    title: 'What is a re-match?',
    description:
      'A re-match is when you or your opponent runs into a issue like the disconnections. You guys may set up a re-match. ' +
      'When you are reporting your results on TCG Showdown the results will be from the re-match and not the original match if a re-match occurs.',
  },
  {
    title: 'If we have a re-match do, we must tell TCG Showdown',
    description:
      'NO. You and your opponent handles the re-match during your play time.',
  },
  {
    title:
      'What happens if we need to do a re-match, but my opponent is not answering.',
    description:
      'If this happens please create a dispute. ' +
      'Please provide evidence that you try to message your opponent and they did not answer. ' +
      'If you can’t not prove that your game needed a rematch with evidence. ' +
      'We will not be able to grant you a victory for the dispute.',
  },
];

export const faqsInternetIssues = [
  {
    title: 'Lag',
    description:
      'We understand that some players do not have the best internet connection and lag may be a factor in some matches. ' +
      'If both players can play the game, then the game will have to be played. We have no way of knowing how bad the lag may be in your game, so we encourage player to NOT compete in matches with lag. ' +
      'If a player is found to be intentionally lagging or unplugging their internet connection to give themselves a competitive advantage; that player will get a IP ban on TCG Showdown.',
  },
  {
    title:
      'What happens if my opponent or I get disconnected during our match?',
    description:
      'It is the responsibility of each player to ensure that their connection is suitable for playing online. ' +
      'IF a player gets disconnected, we recommend that they communicate with each other to figure out a rematch. ' +
      'If a player is found disconnecting their internet connection to give themselves a competitive advantage; that player will get a IP ban on TCG Showdown.',
  },
];

export const faqsDisputes = [
  {
    title: 'What is a dispute?',
    description:
      'A dispute is any problem that comes up before, during, or after your match with another player. All disputes are a case-by-case system. ' +
      'You can create a dispute by',
    link: DisputeRoute.ROOT,
    linkText: ' clicking here',
  },
  {
    title: 'What is False reporting?',
    description:
      'When you report the wrong results of a match, this is called false reporting. ' +
      'If you are caught giving false results multiple times. ' +
      'You will get a IP ban from TCG Showdown.',
  },
  {
    title: 'What is a False dispute?',
    description:
      'If you create a dispute for something that did not happen is called false dispute. ' +
      'If you are found creating false disputes you will get an IP ban from TCG Showdown.',
  },
  {
    title: 'Why did I lose my dispute?',
    description:
      'The biggest reason why you would lose your dispute is lack/no evidence. ' +
      'Also make sure all information is correct. ' +
      'Submitting incorrect information can put you at rick for losing your dispute.',
  },
  {
    title: 'Other reasons why you could have lost your dispute?',
    description: `1. No video evidence - Record or stream your entire match, start to finish.  Make sure you're linked to Twitch, YouTube, Twitter, or any other safe video recording software.
      2. No screenshots - At minimum take screenshots, but video will always out-rule screenshots
      3. Little to no explanation of the issue - Make sure you explain the situation from start to finish so the admin understands what's going on.  Don't assume all the facts are known, make sure everything is covered.
      4. Didn't submit the real score - Submitting the full, correct score is extremely important.  Submitting 1-0 will never help you if you are legit.  Admins favor scores that match the evidence on hand.  If there is a mismatch, it may hurt your chances.
      5. No timestamped evidence - Show the time and date your evidence was taken. This proves when the match was played and is extremely important when you've played someone more than once.
      6. Opponents gamer tag wasn't visible - Each video and screenshot must show your opponent's gamer tag and/or team when possible.
      This proves your evidence is from playing that particular opponent.
      7. You weren't aware of the game rules - Each game has a particular set of rules.  Please make sure you've read all of the rules on your match page.`,
  },
];

export const faqsPenalties = [
  {
    title: 'What are penalties?',
    description:
      'We understand that most players or honest and professional, but unfortunate there are a few bad players in the community. ' +
      'We have created a list of penalties that you can receive if you do not follow TCG Showdowns, rules, policies, or terms.',
  },
  {
    title: 'What penalties can I receive?',
    description:
      'We have a progress penalties system that increases as you violate the same rule, policy, or term.  Here is the list:' +
      '1 - Written warning' +
      '2 - 1 hour account/IP ban' +
      '3 - 1 day account/IP ban' +
      '4 - 7 day account/IP ban' +
      '5 - Account will go under review for potential permanent ban.',
  },
];

export const termsOfService = [
  {
    title: 'Definitions',
    link: 'definitions',
  },
  {
    title: 'Ownership and Limited License — Services Licensed Not Sold',
    link: 'ownership',
  },
  {
    title: 'User Content',
    link: 'U=user',
  },
  {
    title: 'Fees and Payment Terms',
    link: 'fees',
  },
  {
    title: 'Duration',
    link: 'duration',
  },
  {
    title: 'Account Access and Permissible Assignment',
    link: 'account',
  },
  {
    title: 'Service and Availability',
    link: 'service',
  },
  {
    title: 'Additional Warranties and Representations By You',
    link: 'additional',
  },
  {
    title: 'Indemnity',
    link: 'indemnity',
  },
  {
    title: 'Dispute Resolution',
    link: 'dispute',
  },
  {
    title: 'General Provisions',
    link: 'general',
  },
  {
    title: 'Third-Party Trade Marks',
    link: 'third-party',
  },
];
