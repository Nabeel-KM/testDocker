export const responseTransformer = (): object => {
  return {
    userId: 0,
    taskId: 0,
    block: 0,
    blockReason: 0,
    __v: 0,
    updatedAt: 0,
    ratings: 0,
    offers: 0,
    _averageRating: 0,
    'user.password': 0,
  };
};

export const chatMessagesResponseTransformer = (): object => {
  return {
    vendorDeleted: 0,
    customerDeleted: 0,
    // updatedAt: 0,
    // createdAt: 0,
    vendorId: 0,
    customerId: 0,
    __v: 0,
    _id: 0,
  };
};

export interface CustomResponseType {
  status: number;
  message: string;
  payload: object;
}

export interface PaginationResponseType {
  data: any[];
  total: number;
}
