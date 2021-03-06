jest.mock('../zklib/att_parser_legacy');
jest.mock('../zklib/att_parser_v6.60');

const ZKLib = require('../zklib/zklib');
const attendanceLegacyParser = require('../zklib/att_parser_legacy');
const attendanceV660Parser = require('../zklib/att_parser_v6.60');

beforeEach(() => {
  jest.clearAllMocks();
});

describe('decodeAttendanceData', () => {
  test('when no attendanceParser option is specify it should use the legacy parser', () => {
    const zk = new ZKLib({ ip: '123', inport: 123 });

    const buffer = new Buffer([]);

    zk.decodeAttendanceData(buffer);

    expect(attendanceLegacyParser.parse).toBeCalledWith(buffer);
    expect(attendanceV660Parser.parse).not.toBeCalled();
  });

  test('when the attendanceParser option is legacy it should use the legacy parser', () => {
    const zk = new ZKLib({ ip: '123', inport: 123, attendanceParser: 'legacy' });

    const buffer = new Buffer([]);

    zk.decodeAttendanceData(buffer);

    expect(attendanceLegacyParser.parse).toBeCalledWith(buffer);
    expect(attendanceV660Parser.parse).not.toBeCalled();
  });

  test('when the attendanceParser option is v6.60 it should use the v6.60 parser', () => {
    const zk = new ZKLib({ ip: '123', inport: 123, attendanceParser: 'v6.60' });

    const buffer = new Buffer([]);

    zk.decodeAttendanceData(buffer);

    expect(attendanceV660Parser.parse).toBeCalledWith(buffer);
    expect(attendanceLegacyParser.parse).not.toBeCalled();
  });
});
