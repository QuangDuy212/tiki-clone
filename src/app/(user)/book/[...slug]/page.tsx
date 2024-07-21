import BookDetail from "src/components/Book/book.detail";
import { callGetBookById } from "src/services/api";



const BookDetailPage = async ({ params }: { params: { slug: string } }) => {

    //PROPS:
    console.log(">>> check params: ", params);

    //METHODS: 
    params.slug = params.slug + '';
    const temp = params?.slug?.split(".html") ?? [];
    const temp1 = (temp[0]?.split("-") ?? []) as string[];
    const id = temp1[temp1.length - 1];

    const getImages = (raw: IBook | undefined) => {
        const images = [];
        if (raw?.thumbnail) {
            images.push({
                original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${raw.thumbnail}`,
                thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${raw.thumbnail}`,
                originalClass: 'origintal-image',
                thumbnailClass: 'thumbnail-image'
            })
        }
        if (raw?.slider) {
            raw?.slider?.map(item => {
                images.push({
                    original: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${item}`,
                    thumbnail: `${process.env.NEXT_PUBLIC_BACKEND_URL}/images/book/${item}`,
                    originalClass: 'origintal-image',
                    thumbnailClass: 'thumbnail-image'
                })
            })
        }
        return images;
    }

    const res = await callGetBookById(id);
    const items = getImages(res?.data)



    return (
        <>
            <BookDetail dataBook={res?.data} image={items} />
        </>
    )
}

export default BookDetailPage;