export interface Standard {
  id: string;
  createdAt: Date | string;
  updatedAt: Date | string;
}

export interface ChatMessage extends Standard {
  content: string;
  UserId: string;
  User: User;
  RoomId: string;
}

export interface User extends Standard {
  first_name: string;
  last_name: string;
  linkedinId: string;
  linkedinProPic: string;
}

export interface Room extends Standard {
  name: string;
}
