const EventEmitter = require('events');
const readline = require('readline');

class VirtualPet {
  constructor(name) {
    this.name = name;
    this.happiness = 100;
    this.hungry = 0;
    this.energy = 100;
  }

  petFeed(){
    this.hungry = Math.max(this.hungry - 20, 0);
    this.happiness = Math.min(this.happiness + 10, 100);
    this.energy = Math.min(this.energy + 10, 100);
    this.petMood();
  };

  petSleep(){
    this.energy = Math.min(this.energy + 20, 100);
    this.hungry = Math.min(this.hungry + 10, 100);
    this.happiness = Math.min(this.happiness + 10, 100);
    this.petMood();
  };

  petPlay(){
    this.happiness = Math.min(this.happiness + 30, 100);
    this.energy = Math.max(this.energy - 20, 0);
    this.hungry = Math.min(this.hungry + 10, 100);
    this.petMood();
  };

  petIgnored(){
    console.log(`${this.name.toUpperCase()} FEELS IGNORED!`);
    this.energy = Math.max(this.energy - 10, 0);
    this.hungry = Math.min(this.hungry + 10, 100);
    this.happiness = Math.max(this.happiness - 10, 0);
    this.petMood();
  };

  petMood(){
    const getEmoji = (param, type = 'desc') => {
      if (type == 'desc') {
        return param >= 70 ? '😄' : param >= 40 ? '😐' : '😭';
      } else if (type == 'asc') {
        return param <= 30 ? '😄' : param <= 60 ? '😐' : '😭';
      }
    };
    console.log(
      `My pet ${this.name} mood:\nhungry ${getEmoji(
        this.hungry,
        'asc'
      )}, energy ${getEmoji(this.energy)}, happiness ${getEmoji(
        this.happiness
      )}`
    );
  };
}

const emitter = new EventEmitter();

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const cat = new VirtualPet('Kitty');

const ask = () => {

  const timeout = setTimeout(() => {
    emitter.emit('ignored');
    rl.prompt();
  }, 5000);
  rl.question('Choose [feed, sleep, play, mood] or close: ', (event) => {
    clearTimeout(timeout);
    const input = event.trim().toLowerCase();
    if (!event) {
      emitter.emit('ignored');
    } else if (['feed', 'sleep', 'play', 'mood'].includes(input)) {
      emitter.emit(input);
    } else if (input === 'close') {
      rl.close();
    } else {
      console.log('Oops! Try feed, sleep, or play.');
    }
    ask();
  });
};

ask();

emitter.on('feed', () => cat.petFeed());
emitter.on('sleep', () => cat.petSleep());
emitter.on('play', () => cat.petPlay());
emitter.on('mood', () => cat.petMood());
emitter.on('ignored', () => cat.petIgnored());

rl.on('close', () => {
  console.log('Goodbye!');
  process.exit(0);
});
