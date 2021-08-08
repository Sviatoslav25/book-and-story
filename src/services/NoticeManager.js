import { EventEmitter } from 'events';

class NoticeManager {
  emitter = new EventEmitter();

  eventTypes = {
    NOTICE_QUANTITY_CHANGE: 'NOTICE_QUANTITY_CHANGE',
  };

  noticeQuantityChange() {
    this.emitter.emit(this.eventTypes.NOTICE_QUANTITY_CHANGE);
  }

  onNoticeQuantityChange(sb) {
    this.emitter.on(this.eventTypes.NOTICE_QUANTITY_CHANGE, sb);
    return () => {
      this.emitter.off(this.eventTypes.NOTICE_QUANTITY_CHANGE, sb);
    };
  }
}

export default new NoticeManager();
