interface clashErrors {
  title?: string[];
  description?: string[];
  expire_at?: string[];
  banner?: string[];
}

interface ClashInterface {
  banner: {
    image_url: string;
  };
  banner_id: string;
  created_at: string;
  description: string;
  expire_at: string;
  id: string;
  title: string;
  user_id: string;
}

interface CompleteClashInterface{
  clash_item: ClashItem[];
  ClashComment: ClashComment[];
  id: string,
  user_id: string,
  title: string,
  description: string,
  expire_at: string,
  created_at: string
}

interface ClashItem{
  id: string,
  image_url: string,
  likes: number,
  
}

interface ClashComment{
  id: string,
  comment: string,
  created_at: string,
}

interface ClashItemsForm {
  image: File | null;
}
