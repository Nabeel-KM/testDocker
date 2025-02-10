export enum Role {
  ADMIN = 'admin',
  SUB_ADMIN = 'sub admin',
}

export enum AdminPermissions {
  ALL = '*',
  SUPPORT = 'support',
}

export enum TaskTypes {
  PHYSICAL = 'physical',
  ONLINE = 'online',
}

export enum MessageMediaTypes {
  IMAGE = 'image',
  VIDEO = 'video',
  FILE = 'file',
}

export enum TaskMediaTypes {
  IMAGE = 'image',
  VIDEO = 'video',
}

export enum TaskStatus {
  OPEN = 'open',
  ASSIGNED = 'assigned',
  COMPLETED = 'completed',
  DRAFT = 'draft',
  CANCELED = 'canceled',
}

export enum OfferStatus {
  PENDING = 'pending',
  ACCEPT = 'accept',
}

export enum OrderStatus {
  PENDING = 'pending',
  PAID = 'paid',
  FAILED = 'failed',
  CANCELED = 'canceled',
  DRAFT = 'draft', // drafted orders not count, can be removed using cron job after 7 days if not paid!
  COMPLETED = 'completed',
}

export enum PaymentMethod {
  STRIPE = 'stripe',
  PAYPAL = 'paypal',
  CYBER_SOURCE = 'cyber_source',
}

export enum ErrorStatus {
  SUCCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARN = 'warn',
}

export enum KycStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  DECLINED = 'declined',
}

export enum MessageReport {
  COMMENT = 'comment',
  CHAT = 'chat',
}
