import StatusCode from "status-code-enum";
import { sendServiceResponse } from "./service";

const getMockedResponse = () => ({
  status: jest.fn().mockReturnThis(),
  send: jest.fn(),
});

describe("sendServiceResponse", () => {
  it("sends internal server error status", async () => {
    const response = getMockedResponse();
    await sendServiceResponse(
      response as any,
      jest.fn().mockRejectedValue(new Error())
    );

    expect(response.status).toHaveBeenCalledWith(
      StatusCode.ServerErrorInternal
    );
    expect(response.send).toHaveBeenCalled();
  });

  it.each([
    ["validation-error", StatusCode.ClientErrorBadRequest],
    ["error", StatusCode.ServerErrorInternal],
    ["success", StatusCode.SuccessOK],
  ])("when %s sends %s", async (type, statusCode) => {
    const response = getMockedResponse();

    await sendServiceResponse(
      response as any,
      jest.fn().mockReturnValue({ type })
    );

    expect(response.status).toHaveBeenCalledWith(statusCode);
    expect(response.send).toHaveBeenCalled();
  });
});
