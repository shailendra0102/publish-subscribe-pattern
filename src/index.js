class BroadcastingService {
  constructor(channel) {
    this.channelList = channel;
  }
  publish(channelNumber, programe) {
    this.channelList.forEach(channel => {
      channel.publish.apply(channel, [channelNumber, programe]);
    });
  }
}

class Radio {
  constructor() {
    this.channelName = "Radio";
    this.subscriptions = {};
  }

  publish(channelNumber, programe) {
    if (this.subscriptions.hasOwnProperty(channelNumber)) {
      this.subscriptions[channelNumber].forEach(subscription =>
        subscription.apply(null, [programe])
      );
    }
    // else {
    //   throw new Error(
    //     `Noone has subscribed to channel ${channelNumber} on ${
    //       this.channelName
    //     }`
    //   );
    // }
  }

  subscribe(channelNumber, callback) {
    if (!this.subscriptions.hasOwnProperty(channelNumber)) {
      this.subscriptions[channelNumber] = [callback];
    } else {
      this.subscriptions[channelNumber].push(callback);
    }
  }
}

class TV {
  constructor() {
    this.channelName = "TV";
    this.subscriptions = {};
  }

  publish(channelNumber, programe) {
    if (this.subscriptions.hasOwnProperty(channelNumber)) {
      this.subscriptions[channelNumber].forEach(subscription =>
        subscription.apply(null, [programe])
      );
    }
    // else {
    //   throw new Error(
    //     `Noone has subscribed to channel ${channelNumber} on ${
    //       this.channelName
    //     }`
    //   );
    // }
  }

  subscribe(channelNumber, callback) {
    if (!this.subscriptions.hasOwnProperty(channelNumber)) {
      this.subscriptions[channelNumber] = [callback];
    } else {
      this.subscriptions[channelNumber].push(callback);
    }
  }
}

class Person {
  constructor(name, channel) {
    this.name = name;
    this.channel = channel;
  }
  subscribe(channelNumber, callback) {
    console.log(
      `${this.name} has subscibed to ${
        this.channel.channelName
      } on ${channelNumber}`
    );
    this.channel.subscribe(channelNumber, callback);
  }
}

const RadioDevice = new Radio();
const TvDevice = new TV();

const satelite = new BroadcastingService([RadioDevice, TvDevice]);

const shailendra = new Person("Shailendra", TvDevice);
const shalini = new Person("Shalini", RadioDevice);

shailendra.subscribe("404", programe =>
  console.log(`Shailendra is seeing ${programe} on 404 channel`)
);
shalini.subscribe("93.5", programe =>
  console.log(`Shalini is listening ${programe} on 93.5 channel`)
);

satelite.publish("404", "Avengers");
satelite.publish("93.5", "Chitrahar");
