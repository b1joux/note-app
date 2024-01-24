class ResponseHelper {
  static sendResponse: any = (res: any, status: any, resData: any) => {
    res.status(status).json({
      status: status,
      data: resData,
      meta: {
        timeStamp: Math.floor(Date.now() / 1000),
      },
    });
  };

  static sendErrorResponse: any = (res: any, error: any) => {
    const status = error.status || 500;
    const message = error.message || error || 'Unknown Error';
    res.status(status).json({
      status: status,
      data: message,
      meta: {
        timeStamp: Math.floor(Date.now() / 1000),
      },
    });
  };
}

export default ResponseHelper;
