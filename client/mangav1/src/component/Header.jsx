import React, { useState } from "react";
import logo from "../logo_copmanga.png";

export const genres = [
  {
    genre: "Action",
    href: "/tim-truyen/action-95",
    title:
      "Thể loại này thường có nội dung về đánh nhau, bạo lực, hỗn loạn, với diễn biến nhanh",
  },
  {
    genre: "Adult",
    href: "/tim-truyen/truong-thanh",
    title: "Thể loại Adult đề cập đến vấn đề nhạy cảm, chỉ dành cho tuổi 17+",
  },
  {
    genre: "Adventure",
    href: "/tim-truyen/adventure",
    title:
      "Thể loại phiêu lưu, mạo hiểm, thường là hành trình của các nhân vật",
  },
  {
    genre: "Anime",
    href: "/tim-truyen/anime",
    title: "Truyện đã được chuyển thể thành film Anime",
  },
  {
    genre: "Chuyển Sinh",
    href: "/tim-truyen/chuyen-sinh-2131",
    title:
      "Thể loại này là những câu chuyện về người ở một thế giới này xuyên đến một thế giới khác, có thể là thế giới mang phong cách trung cổ với kiếm sĩ và ma thuật, hay thế giới trong game, hoặc có thể là bạn chết ở nơi này và được chuyển sinh đến nơi khác",
  },
  {
    genre: "Comedy",
    href: "/tim-truyen/comedy-99",
    title:
      "Thể loại có nội dung trong sáng và cảm động, thường có các tình tiết gây cười, các xung đột nhẹ nhàng",
  },
  {
    genre: "Comic",
    href: "/tim-truyen/comic",
    title: "Truyện tranh Châu Âu và Châu Mĩ",
  },
  {
    genre: "Cooking",
    href: "/tim-truyen/cooking",
    title: "Thể loại có nội dung về nấu ăn, ẩm thực",
  },
  {
    genre: "Cổ Đại",
    href: "/tim-truyen/co-dai-207",
    title: "Truyện có nội dung xảy ra ở thời cổ đại phong kiến.",
  },
  {
    genre: "Doujinshi",
    href: "/tim-truyen/doujinshi",
    title:
      "Thể loại truyện phóng tác do fan hay có thể cả những Mangaka khác với tác giả truyện gốc. Tác giả vẽ Doujinshi thường dựa trên những nhân vật gốc để viết ra những câu chuyện theo sở thích của mình",
  },
  {
    genre: "Drama",
    href: "/tim-truyen/drama-103",
    title:
      "Thể loại mang đến cho người xem những cảm xúc khác nhau: buồn bã, căng thẳng thậm chí là bi phẫn",
  },
  {
    genre: "Đam Mỹ",
    href: "/tim-truyen/dam-my",
    title: "Truyện tình cảm giữa nam và nam.",
  },
  {
    genre: "Ecchi",
    href: "/tim-truyen/ecchi",
    title: "Thường có những tình huống nhạy cảm nhằm lôi cuốn người xem",
  },
  {
    genre: "Fantasy",
    href: "/tim-truyen/fantasy-1050",
    title:
      "Thể loại xuất phát từ trí tưởng tượng phong phú, từ pháp thuật đến thế giới trong mơ thậm chí là những câu chuyện thần tiên",
  },
  {
    genre: "Gender Bender",
    href: "/tim-truyen/gender-bender-106",
    title:
      "Là một thể loại trong đó giới tính của nhân vật bị lẫn lộn: nam hoá thành nữ, nữ hóa thành nam...",
  },
  {
    genre: "Harem",
    href: "/tim-truyen/harem-107",
    title:
      "Thể loại truyện tình cảm, lãng mạn mà trong đó, nhiều nhân vật nữ thích một nam nhân vật chính",
  },
  {
    genre: "Historical",
    href: "/tim-truyen/historical",
    title: "Thể loại có liên quan đến thời xa xưa",
  },
  {
    genre: "Horror",
    href: "/tim-truyen/horror",
    title:
      "Horror là: rùng rợn, nghe cái tên là bạn đã hiểu thể loại này có nội dung thế nào. Nó làm cho bạn kinh hãi, khiếp sợ, ghê tởm, run rẩy, có thể gây sock - một thể loại không dành cho người yếu tim",
  },
  {
    genre: "Josei",
    href: "/tim-truyen/josei",
    title:
      "Thể loại của manga hay anime được sáng tác chủ yếu bởi phụ nữ cho những độc giả nữ từ 18 đến 30. Josei manga có thể miêu tả những lãng mạn thực tế , nhưng trái ngược với hầu hết các kiểu lãng mạn lí tưởng của Shoujo manga với cốt truyện rõ ràng, chín chắn",
  },
  {
    genre: "Live action",
    href: "/tim-truyen/live-action",
    title: "Truyện đã được chuyển thể thành phim",
  },
  {
    genre: "Manga",
    href: "/tim-truyen/manga-112",
    title: "Truyện tranh của Nhật Bản",
  },
  {
    genre: "Manhua",
    href: "/tim-truyen/manhua",
    title: "Truyện tranh của Trung Quốc",
  },
  {
    genre: "Manhwa",
    href: "/tim-truyen/manhwa-11400",
    title: "Truyện tranh Hàn Quốc, đọc từ trái sang phải",
  },
  {
    genre: "Martial Arts",
    href: "/tim-truyen/martial-arts",
    title:
      "Giống với tên gọi, bất cứ gì liên quan đến võ thuật trong truyện từ các trận đánh nhau, tự vệ đến các môn võ thuật như akido, karate, judo hay taekwondo, kendo, các cách né tránh",
  },
  {
    genre: "Mature",
    href: "/tim-truyen/mature",
    title:
      "Thể loại dành cho lứa tuổi 17+ bao gồm các pha bạo lực, máu me, chém giết, tình dục ở mức độ vừa",
  },
  {
    genre: "Mecha",
    href: "/tim-truyen/mecha-117",
    title:
      "Mecha, còn được biết đến dưới cái tên meka hay mechs, là thể loại nói tới những cỗ máy biết đi (thường là do phi công cầm lái)",
  },
  {
    genre: "Mystery",
    href: "/tim-truyen/mystery",
    title:
      "Thể loại thường xuất hiện những điều bí ấn không thể lí giải được và sau đó là những nỗ lực của nhân vật chính nhằm tìm ra câu trả lời thỏa đáng",
  },
  {
    genre: "Ngôn Tình",
    href: "/tim-truyen/ngon-tinh",
    title:
      "Truyện thuộc kiểu lãng mạn, kể về những sự kiện vui buồn trong tình yêu của nhân vật chính.",
  },
  {
    genre: "One shot",
    href: "/tim-truyen/one-shot",
    title: "Những truyện ngắn, thường là 1 chapter",
  },
  {
    genre: "Psychological",
    href: "/tim-truyen/psychological",
    title:
      "Thể loại liên quan đến những vấn đề về tâm lý của nhân vật ( tâm thần bất ổn, điên cuồng ...)",
  },
  {
    genre: "Romance",
    href: "/tim-truyen/romance-121",
    title:
      "Thường là những câu chuyện về tình yêu, tình cảm lãng mạn. Ớ đây chúng ta sẽ lấy ví dụ như tình yêu giữa một người con trai và con gái, bên cạnh đó đặc điểm thể loại này là kích thích trí tưởng tượng của bạn về tình yêu",
  },
  {
    genre: "School Life",
    href: "/tim-truyen/school-life",
    title:
      "Trong thể loại này, ngữ cảnh diễn biến câu chuyện chủ yếu ở trường học",
  },
  {
    genre: "Sci-fi",
    href: "/tim-truyen/sci-fi",
    title:
      "Bao gồm những chuyện khoa học viễn tưởng, đa phần chúng xoay quanh nhiều hiện tượng mà liên quan tới khoa học, công nghệ, tuy vậy thường thì những câu chuyện đó không gắn bó chặt chẽ với các thành tựu khoa học hiện thời, mà là do con người tưởng tượng ra",
  },
  {
    genre: "Seinen",
    href: "/tim-truyen/seinen",
    title:
      "Thể loại của manga thường nhằm vào những đối tượng nam 18 đến 30 tuổi, nhưng người xem có thể lớn tuổi hơn, với một vài bộ truyện nhắm đến các doanh nhân nam quá 40. Thể loại này có nhiều phong cách riêng biệt , nhưng thể loại này có những nét riêng biệt, thường được phân vào những phong cách nghệ thuật rộng hơn và phong phú hơn về chủ đề, có các loại từ mới mẻ tiên tiến đến khiêu dâm",
  },
  {
    genre: "Shoujo",
    href: "/tim-truyen/shoujo",
    title:
      "Đối tượng hướng tới của thể loại này là phái nữ. Nội dung của những bộ manga này thường liên quan đến tình cảm lãng mạn, chú trọng đầu tư cho nhân vật (tính cách,...)",
  },
  {
    genre: "Shoujo Ai",
    href: "/tim-truyen/shoujo-ai-126",
    title:
      "Thể loại quan hệ hoặc liên quan tới đồng tính nữ, thể hiện trong các mối quan hệ trên mức bình thường giữa các nhân vật nữ trong các manga, anime",
  },
  {
    genre: "Shounen",
    href: "/tim-truyen/shounen-127",
    title:
      "Đối tượng hướng tới của thể loại này là phái nam. Nội dung của những bộ manga này thường liên quan đến đánh nhau và/hoặc bạo lực (ở mức bình thường, không thái quá)",
  },
  {
    genre: "Shounen Ai",
    href: "/tim-truyen/shounen-ai",
    title:
      "Thể loại có nội dung về tình yêu giữa những chàng trai trẻ, mang tính chất lãng mạn nhưng ko đề cập đến quan hệ tình dục",
  },
  {
    genre: "Slice of Life",
    href: "/tim-truyen/slice-of-life",
    title: "Nói về cuộc sống đời thường",
  },
  {
    genre: "Smut",
    href: "/tim-truyen/smut",
    title:
      "Những truyện có nội dung hơi nhạy cảm, đặc biệt là liên quan đến tình dục",
  },
  {
    genre: "Soft Yaoi",
    href: "/tim-truyen/soft-yaoi",
    title: "Boy x Boy. Nặng hơn Shounen Ai tí.",
  },
  {
    genre: "Soft Yuri",
    href: "/tim-truyen/soft-yuri",
    title: "Girl x Girl. Nặng hơn Shoujo Ai tí",
  },
  {
    genre: "Sports",
    href: "/tim-truyen/sports",
    title:
      "Đúng như tên gọi, những môn thể thao như bóng đá, bóng chày, bóng chuyền, đua xe, cầu lông,... là một phần của thể loại này",
  },
  {
    genre: "Supernatural",
    href: "/tim-truyen/supernatural",
    title:
      "Thể hiện những sức mạnh đáng kinh ngạc và không thể giải thích được, chúng thường đi kèm với những sự kiện trái ngược hoặc thách thức với những định luật vật lý",
  },
  {
    genre: "Thiếu Nhi",
    href: "/tim-truyen/thieu-nhi",
    title: "Truyện tranh dành cho lứa tuổi thiếu nhi",
  },
  {
    genre: "Tragedy",
    href: "/tim-truyen/tragedy-136",
    title:
      "Thể loại chứa đựng những sự kiện mà dẫn đến kết cục là những mất mát hay sự rủi ro to lớn",
  },
  {
    genre: "Trinh Thám",
    href: "/tim-truyen/trinh-tham",
    title:
      "Các truyện có nội dung về các vụ án, các thám tử cảnh sát điều tra...",
  },
  {
    genre: "Truyện scan",
    href: "/tim-truyen/truyen-scan",
    title: "Các truyện đã phát hành tại VN được scan đăng online",
  },
  {
    genre: "Truyện Màu",
    href: "/tim-truyen/truyen-mau-214",
    title: "Tổng hợp truyện tranh màu, rõ, đẹp",
  },
  {
    genre: "Webtoon",
    href: "/tim-truyen/webtoon",
    title:
      "Là truyện tranh được đăng dài kỳ trên internet của Hàn Quốc chứ không xuất bản theo cách thông thường",
  },
  {
    genre: "Xuyên Không",
    href: "/tim-truyen/xuyen-khong-205",
    title:
      "Xuyên Không, Xuyên Việt là thể loại nhân vật chính vì một lý do nào đó mà bị đưa đến sinh sống ở một không gian hay một khoảng thời gian khác. Nhân vật chính có thể trực tiếp xuyên qua bằng thân xác mình hoặc sống lại bằng thân xác người khác.",
  },
];

const Header = () => {
  const [showGenres, SetShowGenres] = useState(false);
  const [description, setDescription] = useState(null);
  return (
    <div className="z-[999] fixed top-0 left-0 right-0 desktop-L:px-40 desktop:px-12 tablet:px-4 h-16  flex bg-white justify-between items-center font-semibold text-xl">
      <a href="/" className="h-full cursor-pointer">
        <img className="h-full" src={logo} alt="" />
      </a>
      <nav>
        <a
          href="/hot"
          className="mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          HOT
        </a>
        <a
          onMouseOver={() => SetShowGenres((showGenres) => true)}
          onMouseOut={() => SetShowGenres((showGenres) => false)}
          href="/tim-truyen"
          className="mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          THỂ LOẠI
          {showGenres && (
            <div className="z-[999] shadow-lightRounder absolute top-full left-1/2 -translate-x-1/2 gap-2 grid grid-cols-4 min-w-[35vw] text-black border border-gray-500 rounded text-sm px-6 py-2 font-semibold bg-white">
              {genres.map((item, index) => {
                return (
                  <a
                    className="hover:text-purple-500"
                    key={index}
                    href={item.href}
                    onMouseOver={() => {
                      setDescription((description) => item.title);
                    }}
                    onMouseOut={() => {
                      setDescription((description) => null);
                    }}
                  >
                    <p>{item.genre}</p>
                  </a>
                );
              })}
              {description && (
                <p className=" col-span-4 border-t border-gray-500 py-2">
                  {description}
                </p>
              )}
            </div>
          )}
        </a>
        <a
          href="/tim-truyen-nang-cao"
          className="mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          TÌM TRUYỆN
        </a>
        <a
          href="/truyen-con-gai"
          className="mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          CON GÁI
        </a>
        <a
          href="/truyen-con-trai"
          className="mx-4 cursor-pointer py-2 relative after:absolute after:left-0 after:bottom-0 after:bg-slate-900 after:h-1 after:w-0 hover:after:w-full after:transition-all after:ease-in after:duration-250"
        >
          CON TRAI
        </a>
      </nav>
    </div>
  );
};

export default Header;
