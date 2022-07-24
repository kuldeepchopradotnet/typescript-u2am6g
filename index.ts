class Stream {
  event = new Event('error');
  subEvents = [];

  read() {}

  write() {
    let i = 0;
    const id = setInterval(() => {
      if (i === 10) {
        clearInterval(id);
        this.dispatchEvent('end', true);
      } else {
        this.dispatchEvent('data', i++);
      }
    }, 2e3);
  }

  private dispatchEvent(event, data) {
    this.subEvents.forEach((e) => {
      if (event === e.type) {
        e.cb(data);
      }
    });
  }

  on(event: 'end' | 'data' | 'error', cb: (res?: any) => void) {
    this.subEvents.push({
      type: event,
      cb,
    });
  }
}

const stream = new Stream();

stream.on('data', (data) => {
  console.log('stream data', data);
});

stream.on('end', (data) => {
  console.log('stream end', data);
});

stream.write();
