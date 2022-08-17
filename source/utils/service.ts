import { Response } from "express";
import { StatusCode } from "status-code-enum";

type ServiceResponseType = "success" | "validation-error" | "error";

export interface ServiceResponse<T> {
  data?: T;
  type: ServiceResponseType;
}

const getStatus = (type: ServiceResponseType) => {
  switch (type) {
    case "error":
      return StatusCode.ServerErrorInternal;
    case "validation-error":
      return StatusCode.ClientErrorBadRequest;
    case "success":
    default:
      return StatusCode.SuccessOK;
  }
};

export const sendServiceResponse = async <T>(
  response: Response,
  action: () => Promise<ServiceResponse<T>>
) => {
  try {
    const result = await action();

    response.status(getStatus(result.type)).send(result.data);
  } catch (error) {
    response.status(getStatus("error")).send();
  }
};
