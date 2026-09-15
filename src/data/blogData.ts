// Authentic B+ON Architectural Journal & Blog Data
// Direct synchronization with fiftyfourms.com/blog

export interface BlogArticleSection {
  slug?: string;
  headingVi?: string;
  headingEn?: string;
  contentVi: string;
  contentEn: string;
  paragraphsVi?: string[];
  paragraphsEn?: string[];
  image?: string;
  captionVi?: string;
  captionEn?: string;
  calloutVi?: string;
  calloutEn?: string;
  listItemsVi?: string[];
  listItemsEn?: string[];
  linkTextVi?: string;
  linkTextEn?: string;
  linkUrl?: string;
  relatedArticles?: {
    slug: string;
    titleVi: string;
    titleEn: string;
    image: string;
  }[];
}

export interface BlogPost {
  id: string;
  slug: string;
  titleVi: string;
  titleEn: string;
  categoryVi: string;
  categoryEn: string;
  date: string;
  dateEn: string;
  readTimeVi: string;
  readTimeEn: string;
  coverImage: string;
  headerDesktopImages?: { high: string; low: string; alt?: string }[];
  summaryVi: string;
  summaryEn: string;
  sections: BlogArticleSection[];
  featuredProducts?: string[];
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    "id": "how-to-choose-conference-table-size-and-seating",
    "slug": "how-to-choose-conference-table-size-and-seating",
    "titleVi": "Cách Chọn Bàn Họp Văn Phòng: Kích Thước, Số Chỗ Ngồi & Tiện Ích Tích Hợp",
    "titleEn": "How to Choose an Office Conference Table: Dimensions, Seating & Integrated Tech",
    "categoryVi": "Văn Phòng & Dự Án",
    "categoryEn": "Office & Projects",
    "date": "16 Tháng 2, 2026",
    "dateEn": "February 16, 2026",
    "readTimeVi": "6 phút đọc",
    "readTimeEn": "6 min read",
    "coverImage": "https://media.fiftyfourms.com/1920_header_1_a9251e5015.webp",
    "headerDesktopImages": [
      {
        "high": "https://media.fiftyfourms.com/1920_header_1_a9251e5015.webp",
        "low": "https://media.fiftyfourms.com/thumbnail_1920_header_1_a9251e5015.webp",
        "alt": "How to choose an office conference table: size, seating, and integrated technology | B+ON"
      },
      {
        "high": "https://media.fiftyfourms.com/1920_header_2_4b97c837b0.webp",
        "low": "https://media.fiftyfourms.com/thumbnail_1920_header_2_4b97c837b0.webp",
        "alt": "Mergentia conference table details from B+ON"
      }
    ],
    "summaryVi": "Bàn họp giữ vị trí chiến lược cốt lõi trong không gian văn phòng điều hành. Đây là nơi định hình quyết định, đón tiếp đối tác và tôn vinh đẳng cấp thương hiệu, đòi hỏi sự chuẩn xác về kích thước, công thái học và tiện ích công nghệ tích hợp.",
    "summaryEn": "A boardroom table occupies a decisive position in the executive suite, serving not merely for seating meetings but as an architectural emblem of corporate prestige and collaborative productivity.",
    "featuredProducts": [],
    "tags": [],
    "sections": [
      {
        "slug": "chto-uchityvat-krome-kolichestva-mest",
        "headingVi": "Những yếu tố cần cân nhắc ngoài số chỗ ngồi",
        "headingEn": "Key Considerations Beyond Seating Capacity",
        "contentVi": "Bàn họp giữ vị trí then chốt trong không gian văn phòng. Đây là nơi thảo luận các chiến lược trọng yếu, tổ chức cuộc họp điều hành, đón tiếp đối tác và đưa ra quyết định quan trọng, vì vậy sứ mệnh của nó vượt xa việc chỉ sắp xếp đủ số lượng người ngồi. Một chiếc bàn họp được thiết kế chuẩn xác mang lại cho mỗi người tham gia không gian cá nhân rộng rãi, thoải mái thao tác với laptop và tài liệu, duy trì tầm nhìn bao quát và giúp mọi thành viên luôn tập trung kết nối vào cuộc thảo luận. Làm thế nào để tính toán kích thước bàn họp chuẩn xác, lựa chọn kiểu dáng phù hợp và xác định các tiện ích công nghệ thực sự cần thiết? Hãy cùng B+ON phân tích chi tiết từng khía cạnh.",
        "contentEn": "The conference table occupies a decisive position in the executive office. Here key strategic initiatives are discussed, leadership meetings conducted, partners received, and pivotal decisions made, so its role extends far beyond merely accommodating a headcount. A thoughtfully engineered table affords each participant ample personal space, enables seamless work with laptops and documents, maintains clear sightlines, and keeps everyone actively engaged in the dialogue. How do you calculate the optimal conference table size, select the ideal geometry, and discern what technology integration is truly essential? Let us explore each element methodically.",
        "paragraphsVi": [
          "Bàn họp giữ vị trí then chốt trong không gian văn phòng. Đây là nơi thảo luận các chiến lược trọng yếu, tổ chức cuộc họp điều hành, đón tiếp đối tác và đưa ra quyết định quan trọng, vì vậy sứ mệnh của nó vượt xa việc chỉ sắp xếp đủ số lượng người ngồi.",
          "Một chiếc bàn họp được thiết kế chuẩn xác mang lại cho mỗi người tham gia không gian cá nhân rộng rãi, thoải mái thao tác với laptop và tài liệu, duy trì tầm nhìn bao quát và giúp mọi thành viên luôn tập trung kết nối vào cuộc thảo luận.",
          "Làm thế nào để tính toán kích thước bàn họp chuẩn xác, lựa chọn kiểu dáng phù hợp và xác định các tiện ích công nghệ thực sự cần thiết? Hãy cùng B+ON phân tích chi tiết từng khía cạnh."
        ],
        "paragraphsEn": [
          "The conference table occupies a decisive position in the executive office. Here key strategic initiatives are discussed, leadership meetings conducted, partners received, and pivotal decisions made, so its role extends far beyond merely accommodating a headcount.",
          "A thoughtfully engineered table affords each participant ample personal space, enables seamless work with laptops and documents, maintains clear sightlines, and keeps everyone actively engaged in the dialogue.",
          "How do you calculate the optimal conference table size, select the ideal geometry, and discern what technology integration is truly essential? Let us explore each element methodically."
        ],
        "image": "https://media.fiftyfourms.com/1100_portfolio_1_14_0669274e33.webp",
        "captionVi": "Bàn họp cao cấp Mergentia từ B+ON",
        "captionEn": "Mergentia Executive Conference Table by B+ON"
      },
      {
        "slug": "peregovornyj-stol-kak-instrument-kommunikatsii",
        "headingVi": "Bàn họp như một công cụ giao tiếp thị giác & công năng",
        "headingEn": "The Conference Table as an Instrument of Communication",
        "contentVi": "Cách bố trí không gian quanh bàn tác động trực tiếp đến văn hóa và hiệu quả của cuộc họp. Mỗi thành viên cần có chỗ ngồi đàng hoàng, khoảng không thoải mái để làm việc và tầm nhìn bao quát những người cùng họp. Điều này đặc biệt hệ trọng trong các phiên họp kéo dài với số lượng người tham dự lớn. Kích thước và hình khối của bàn cũng định hình mức độ tương tác: tầm nhìn thông thoáng giúp theo dõi phản ứng của đối tác và tham gia thảo luận nhịp nhàng, trong khi sơ đồ bố trí chỗ ngồi chu đáo tạo điều kiện để mọi tiếng nói đều được lắng nghe. Tại các cuộc gặp với khách hàng và đối tác, bàn họp trở thành một phần ấn tượng đầu tiên về doanh nghiệp, thể hiện văn hóa và tầm vóc thương hiệu.",
        "contentEn": "Spatial arrangement around the table fundamentally shapes meeting dynamics. Every participant must have an uncompromised seat, ample room to work, and clear sightlines to all counterparts. This is vital during prolonged sessions and high-attendance negotiations. The scale and geometry of the table also govern collaborative fluidity: unobstructed sightlines facilitate natural dialogue, while structured seating ensures every voice is heard. In meetings with clients and partners, the conference table forms part of the corporate first impression, telegraphing brand authority and attention to detail.",
        "paragraphsVi": [
          "Cách bố trí không gian quanh bàn tác động trực tiếp đến văn hóa và hiệu quả của cuộc họp. Mỗi thành viên cần có chỗ ngồi đàng hoàng, khoảng không thoải mái để làm việc và tầm nhìn bao quát các thành viên khác. Điều này đặc biệt hệ trọng trong các phiên họp kéo dài với số lượng người tham dự lớn.",
          "Kích thước và hình khối của bàn cũng định hình mức độ tương tác: tầm nhìn thông thoáng giúp theo dõi phản ứng của đối tác và tham gia thảo luận nhịp nhàng, trong khi sơ đồ bố trí chỗ ngồi chu đáo tạo điều kiện để mọi tiếng nói đều được lắng nghe.",
          "Tại các cuộc gặp với khách hàng và đối tác, bàn họp trở thành một phần ấn tượng đầu tiên về doanh nghiệp: quy mô bề thế, chất liệu thượng hạng và kỹ nghệ hoàn thiện tinh xảo phản ánh văn hóa và tầm vóc thương hiệu."
        ],
        "paragraphsEn": [
          "Spatial arrangement around the table fundamentally shapes meeting dynamics. Every participant must have an uncompromised seat, ample room to work, and clear sightlines to all counterparts. This is vital during prolonged sessions and high-attendance negotiations.",
          "The scale and geometry of the table also govern collaborative fluidity: unobstructed sightlines facilitate natural dialogue, while structured seating ensures every voice is heard.",
          "In meetings with clients and partners, the conference table forms part of the corporate first impression: its architectural scale, noble materials, and artisanal execution reflect the company's commitment to its workspace and discourse culture."
        ],
        "linkTextVi": "Khám phá bộ sưu tập bàn B+ON",
        "linkTextEn": "Explore B+ON Tables Collection",
        "linkUrl": "#/catalog/cabinet/dining-tables",
        "image": "https://media.fiftyfourms.com/portfolio_2_40_9f6362b243.webp",
        "captionVi": "Giao tiếp thị giác và sự tương tác hài hòa quanh bàn họp",
        "captionEn": "Visual connection and fluid interaction around the table"
      },
      {
        "slug": "razmer-peregovornogo-stola-skolko-mesta-nuzhno",
        "headingVi": "Kích thước bàn họp: Cần bao nhiêu không gian cho mỗi chỗ ngồi",
        "headingEn": "Conference Table Dimensions: How Much Space is Needed",
        "contentVi": "Kích thước bàn họp được quyết định bởi số lượng người tham dự dự kiến và diện tích mặt bằng căn phòng. Thông thường, một vị trí ngồi tiêu chuẩn cần từ 60–70 cm chiều dài cạnh bàn. Đối với ghế bành điều hành có tay vịn rộng và tư thế ngồi thoải mái, kiến trúc sư khuyến nghị dành từ 75–80 cm cho mỗi người. Khi chọn bàn họp kích thước lớn, điều cốt yếu là phải xem xét tổng thể mặt bằng lưu thông: ngoài kích thước mặt bàn, cần dành khoảng lùi cho ghế và lối đi thông thoáng từ 100–120 cm.",
        "contentEn": "The dimension of a boardroom table is governed by the anticipated attendee count and room parameters. On average, a standard seat requires approximately 60–70 cm of table length. For executive armchairs with generous armrests and relaxed postures, 75–80 cm per person is recommended. A grand boardroom table must always be evaluated in synergy with the architectural floorplan: adequate perimeter clearance for chairs and walkways of 100–120 cm is mandatory.",
        "paragraphsVi": [
          "Kích thước bàn họp được quyết định bởi số lượng người tham dự dự kiến và diện tích mặt bằng căn phòng. Thông thường, một vị trí ngồi tiêu chuẩn cần từ 60–70 cm chiều dài cạnh bàn. Đối với ghế bành điều hành có tay vịn rộng và tư thế ngồi thoải mái, kiến trúc sư khuyến nghị dành từ 75–80 cm cho mỗi người.",
          "Những thông số này đóng vai trò kim chỉ nam. Sức chứa thực tế còn phụ thuộc vào độ rộng thân ghế, kết cấu chân trụ đỡ dưới gầm bàn, hình dáng cạnh bàn và việc tận dụng vị trí đầu bàn.",
          "Khi chọn bàn họp kích thước lớn, điều cốt yếu là phải xem xét tổng thể mặt bằng lưu thông. Ngoài kích thước mặt bàn, cần dành khoảng lùi cho ghế và lối đi thông thoáng: tối thiểu 100–120 cm từ mép bàn đến vách tường hoặc tủ kệ tài liệu. Vị trí cửa ra vào, màn hình trình chiếu và các vật dụng khác cũng chi phối kích thước phù hợp."
        ],
        "paragraphsEn": [
          "The dimension of a boardroom table is governed by the anticipated attendee count and room parameters. On average, a standard seat requires approximately 60–70 cm of table length. For executive armchairs with generous armrests and more spacious seating, a larger allowance is needed.",
          "These values serve as practical architectural benchmarks. Actual capacity depends on armchair width, pedestal placement, top geometry, and utilization of end positions.",
          "A grand boardroom table must always be evaluated in synergy with the entire room layout. Beyond the tabletop footprint, adequate perimeter clearance for chairs and fluid circulation around them is essential. Positions of doorways, presentation screens, and surrounding furniture directly affect the optimal table dimensions."
        ],
        "calloutVi": "Bảng thông số kích thước tiêu chuẩn theo số lượng người ngồi:",
        "calloutEn": "Standard Dimension Guidelines by Seating Capacity:",
        "listItemsVi": [
          "Bàn họp dành cho 8 người: chiều dài khoảng 240–280 cm;",
          "Bàn họp dành cho 10 người: chiều dài khoảng 300–350 cm;",
          "Bàn họp dành cho 12 người: chiều dài khoảng 360–420 cm;",
          "Bàn họp dành cho 16–18 người: chiều dài khoảng 450–500 cm."
        ],
        "listItemsEn": [
          "Conference table for 8 people: approx. 240–280 cm;",
          "Conference table for 10 people: approx. 300–350 cm;",
          "Conference table for 12 people: approx. 360–420 cm;",
          "Conference table for 16–18 people: approx. 450–500 cm."
        ],
        "image": "https://media.fiftyfourms.com/portfolio_2_41_e10828dad3.webp",
        "captionVi": "Quy chuẩn tỷ lệ và bố trí chỗ ngồi trong dự án phòng họp quy mô lớn",
        "captionEn": "Spatial proportions and seating capacity in executive boardroom layout"
      },
      {
        "slug": "forma-zavisit-ot-formata-vstrechi",
        "headingVi": "Hình khối bàn họp phụ thuộc vào định dạng cuộc họp",
        "headingEn": "Table Geometry Dictated by Meeting Format",
        "contentVi": "Hình dáng bàn họp chi phối mạnh mẽ cấu trúc chỗ ngồi và tinh thần tương tác. Các mẫu bàn chữ nhật thuôn dài phù hợp nhất cho phòng họp hội đồng và trung tâm hội nghị quy mô lớn. Bàn họp bo cong các góc mềm mại giúp giải tỏa sự cứng nhắc về hình học, tạo lối đi an toàn và thân thiện. Trong khi đó, bàn tròn thích hợp cho các nhóm nhỏ và đảm bảo tầm nhìn tuyệt vời giữa mọi thành viên. Đối với phòng họp thường xuyên họp trực tuyến, cần xác định hình dáng và vị trí bàn đồng thời với hệ thống camera và màn hình lớn.",
        "contentEn": "Table geometry governs hierarchy and engagement. Elongated rectangular profiles excel in corporate boardrooms, accommodating large delegations with structured protocol. Softly rounded radiused corners relieve spatial tension and allow effortless circulation. Circular profiles foster egalitarian exchange for smaller teams with optimal mutual sightlines. In rooms hosting frequent video conferences, geometry and table orientation must align with cameras and displays.",
        "paragraphsVi": [
          "Hình dáng bàn họp chi phối mạnh mẽ cấu trúc chỗ ngồi và tinh thần tương tác. Các mẫu bàn chữ nhật thuôn dài phù hợp nhất cho phòng họp hội đồng và trung tâm hội nghị quy mô lớn: tại đây có thể bố trí lượng lớn đại biểu và thiết lập một cấu trúc buổi họp rõ ràng, khoa học.",
          "Bàn họp bo cong các góc mềm mại giúp giải tỏa sự cứng nhắc về hình học của không gian, tạo lối di chuyển xung quanh an toàn và thoải mái. Trong khi đó, bàn tròn phù hợp cho các nhóm thảo luận nhỏ và đảm bảo tầm quan sát trực diện tuyệt vời giữa mọi người.",
          "Đối với các phòng họp thường xuyên diễn ra hội nghị truyền hình (video conference), việc bố trí tương quan giữa bàn, camera và màn hình là yếu tố sống còn. Mọi thành viên cần theo dõi thuận tiện cả đồng nghiệp trong phòng lẫn hình ảnh trên màn hình lớn mà không bị che khuất tầm nhìn."
        ],
        "paragraphsEn": [
          "Table geometry directly affects seating arrangements and participant interaction. Elongated profiles are optimal for large boardrooms and conference halls, accommodating sizable delegations within a clear meeting hierarchy.",
          "A table with softly rounded corners softens spatial geometry and makes circulating around it vastly more ergonomic. Circular designs excel for smaller groups, ensuring direct, egalitarian sightlines between all seated members.",
          "In meeting spaces with frequent telepresence and video conferences, camera and display placement must be synchronized. Participants must comfortably see colleagues in the room and presentation visuals on screen simultaneously."
        ],
        "image": "https://media.fiftyfourms.com/portfolio_2_39_f96edfc02a.webp",
        "captionVi": "Góc bo cong mềm mại giải tỏa cảm giác gò bó không gian",
        "captionEn": "Curved radiused edges soften spatial geometry and ease circulation"
      },
      {
        "slug": "osnashchenie-kak-chast-peregovornogo-stola",
        "headingVi": "Hệ thống tiện ích công nghệ tích hợp trên bàn họp",
        "headingEn": "Technology Integration as an Inherent Part of the Table",
        "contentVi": "Laptop, máy chiếu, thiết bị hội nghị trực tuyến và bảng tương tác đã biến công nghệ thành bộ phận gắn liền với phòng họp. Các điểm kết nối kỹ thuật nên được tích hợp ngay từ khâu lựa chọn bàn thay vì giải pháp chắp vá tạm bợ. Ổ cắm điện và cổng sạc tích hợp cho phép kết nối thiết bị ngay tại mặt bàn. Nắp lật kỹ thuật âm bàn mang lại khả năng tiếp cận tức thì, đồng thời hệ thống giấu dây ngầm giúp giữ cho mặt bàn luôn tinh tươm, thông thoáng. Càng đông đại biểu tham gia, việc dự trù cổng cấp nguồn độc lập cho từng vị trí ngồi càng trở nên tối quan trọng.",
        "contentEn": "Laptops, telepresence, and multimedia presentations make technology an inseparable facet of boardroom utility. Connectivity junctions should be architecturally integrated from initial furniture selection. Built-in power sockets and charging ports provide direct desktop access. Flip hatches in the tabletop afford swift accessibility, while concealed wire conduits preserve an immaculate, uncluttered surface. As participant capacity scales, dedicated power conduits for each seated zone become indispensable.",
        "paragraphsVi": [
          "Laptop, máy chiếu, thiết bị hội nghị trực tuyến và bảng tương tác đã biến công nghệ thành bộ phận gắn liền với phòng họp. Các điểm kết nối kỹ thuật nên được tích hợp ngay từ khâu lựa chọn bàn thay vì giải pháp chắp vá tạm bợ.",
          "Ổ cắm điện và cổng sạc tích hợp cho phép kết nối thiết bị ngay tại mặt bàn. Nắp lật kỹ thuật âm bàn mang lại khả năng tiếp cận tức thì, đồng thời hệ thống giấu dây ngầm giúp giữ cho mặt bàn luôn tinh tươm, thông thoáng. Đối với hội nghị truyền hình, việc tính toán vị trí bàn tương quan với màn hình và thiết bị thu phát âm thanh cũng rất quan trọng.",
          "Càng đông đại biểu tham gia, việc dự trù cổng cấp nguồn và mạng internet tốc độ cao độc lập cho từng vị trí ngồi càng trở nên tối quan trọng."
        ],
        "paragraphsEn": [
          "Laptops, high-definition telepresence, and multimedia presentations make technology an inseparable facet of boardroom utility. Connectivity junctions should be architecturally integrated from initial furniture selection.",
          "Built-in power sockets and rapid device ports allow participants to plug in right at the table. Tabletop hatches provide immediate access, while concealed cable raceways keep the workspace pristine. For video conferences, aligning table placement with screens and audiovisual hardware in advance is equally essential.",
          "As the number of attendees gathers around a single table, engineering dedicated power access and digital conduits for every seat becomes paramount."
        ],
        "linkTextVi": "Bàn họp Mergentia từ B+ON",
        "linkTextEn": "Mergentia Conference Table by B+ON",
        "linkUrl": "#/product/conference-table-mergentia-caramel",
        "image": "https://media.fiftyfourms.com/portfolio_2_38_2fa061559b.webp",
        "captionVi": "Hệ thống nắp lật âm mặt bàn giấu kín toàn bộ dây nguồn và cáp kết nối",
        "captionEn": "Flush-mounted integrated technical hatches and concealed wire channels"
      },
      {
        "slug": "bolshoj-stol-kak-chast-obraza-kompanii",
        "headingVi": "Bàn họp lớn khẳng định diện mạo & vị thế doanh nghiệp",
        "headingEn": "A Grand Table as the Pillar of Corporate Identity",
        "contentVi": "Trong phòng họp dành cho khách hàng VIP, đối tác chiến lược và ban lãnh đạo cấp cao, công năng luôn song hành cùng sứ mệnh đại diện thương hiệu. Chiếc bàn chiếm tỷ trọng thị giác lớn nhất và trở thành linh hồn của toàn bộ không gian nội thất. Tại đây, tỷ lệ kiến trúc đóng vai trò quyết định: một phòng họp rộng lớn cho phép sử dụng mẫu bàn đồ sộ mang tính tượng đài, trong khi vẫn duy trì lối đi thông thoáng và cảm giác khoáng đạt. Cá tính của tác phẩm được định hình bởi chất liệu quý hiếm và tay nghề hoàn thiện bậc thầy: Gỗ lạng tự nhiên, đá nguyên khối, da thuộc cao cấp và những đường chỉ may tay tinh xảo.",
        "contentEn": "In boardrooms reserved for premier clients, international partners, and executive directors, utility merges with corporate iconography. The table anchors the architectural vista as the primary protagonist. Architectural proportions reign supreme here: an expansive suite accommodates a monumental sculptural table while preserving fluid circulation and an authentic sense of scale. The soul of the piece emanates from noble materials and bespoke craftsmanship: bookmatched natural veneers, stone, hand-stitched leather, and tactile textures.",
        "paragraphsVi": [
          "Trong phòng họp dành cho khách hàng VIP, đối tác chiến lược và ban lãnh đạo cấp cao, công năng luôn song hành cùng sứ mệnh đại diện thương hiệu. Chiếc bàn chiếm tỷ trọng thị giác lớn nhất và trở thành linh hồn của toàn bộ không gian nội thất.",
          "Tại đây, tỷ lệ kiến trúc đóng vai trò quyết định. Một phòng họp rộng lớn cho phép sử dụng mẫu bàn đồ sộ mang tính tượng đài, trong khi vẫn duy trì lối đi thông thoáng và cảm giác khoáng đạt. Với phòng có diện tích nhỏ hơn, mẫu bàn kích thước vừa vặn, đồng điệu với tỷ lệ không gian sẽ là lựa chọn tối ưu.",
          "Cá tính của tác phẩm được định hình bởi chất liệu và tay nghề gia công tinh xảo: Gỗ lạng tự nhiên, đá thạch anh, da thuộc cao cấp và những đường chỉ may tay tinh xảo khẳng định sự tôn trọng cao nhất dành cho đối tác."
        ],
        "paragraphsEn": [
          "In boardrooms reserved for premier clients, partners, and the executive board, utility merges with corporate iconography. The table occupies a substantial portion of the space and stands as the central architectural protagonist.",
          "Proportions reign supreme here. An expansive boardroom accommodates a monumental table while preserving fluid circulation and an authentic sense of architectural scale. For rooms of modest footprint, a proportionally scaled model ensures harmonious balance.",
          "The soul of the piece is defined by noble materials and artisanal execution. Natural veneers, stone, leather, and tactile textures weave the table seamlessly into the interior design concept, elevating the status of the environment."
        ],
        "image": "https://media.fiftyfourms.com/1100_portfolio_1_15_97a2695d9f.webp",
        "captionVi": "Gỗ lạng tự nhiên, đá nguyên khối và những chất liệu cao cấp định hình đẳng cấp",
        "captionEn": "Natural veneers, stone, and noble textures in executive spaces"
      },
      {
        "slug": "mergentia-dlya-peregovornyh-raznogo-masshtaba",
        "headingVi": "Bàn họp Mergentia của B+ON: Tuyệt phẩm cho mọi quy mô",
        "headingEn": "Mergentia for Conference Rooms of Varying Scales",
        "contentVi": "Khi sáng tạo bàn họp Mergentia, đội ngũ B+ON đã hội tụ mọi yếu tố quyết định chất lượng cuộc đàm phán: số lượng chỗ ngồi linh hoạt, không gian riêng tư cho từng đại biểu, công thái học, hệ thống tiện ích điện tử và tính biểu tượng. Mẫu bàn được phát triển với 3 tùy chọn kích thước chiều dài, trong đó phiên bản lớn nhất lên tới gần 5m và đáp ứng tới 18 chỗ ngồi. Mặt bàn bằng veneer gỗ tự nhiên hoặc đá thạch anh, chân trụ tròn bọc da bò Ý khâu tay và nắp lật điện tử thông minh giấu dây hoàn hảo.",
        "contentEn": "In crafting the Mergentia conference table, B+ON considered every determinant of high-level discourse: participant count, individual comfort zones, ergonomics, integrated technology, and executive prestige. Engineered across three dimensional scales, the flagship edition accommodates up to 18 delegates. Tabletop surfaces in natural veneers or quartz agglomerate rest on massive round pedestals hand-wrapped in genuine leather with artisanal stitching, completed with integrated desktop connectivity hatches.",
        "paragraphsVi": [
          "Khi sáng tạo bàn họp Mergentia, đội ngũ B+ON đã hội tụ mọi yếu tố cốt lõi của một cuộc đàm phán thành công: số lượng chỗ ngồi linh hoạt, không gian riêng tư cho từng đại biểu, công thái học, hệ thống tiện ích điện tử và tính biểu tượng. Mẫu bàn được phát triển với 3 tùy chọn kích thước chiều dài, trong đó phiên bản lớn nhất lên tới gần 5m và đáp ứng tới 18 chỗ ngồi.",
          "Mặt bàn được chế tác tinh xảo với các tùy chọn veneer gỗ tự nhiên quý hiếm hoặc đá thạch anh quartz chống trầy xước. Các chân trụ tròn nguyên khối đỡ mặt bàn được bọc da bò Ý thủ công với đường chỉ khâu tay tinh tế sắc sảo.",
          "Chính giữa mặt bàn tích hợp các nắp lật kỹ thuật thông minh, cung cấp đầy đủ cổng sạc nhanh, cổng mạng và kết nối trình chiếu cho các thiết bị cá nhân mà không làm phá vỡ sự liền mạch của mặt gỗ.",
          "Nhờ đó, bàn họp Mergentia từ B+ON là sự hòa quyện hoàn hảo giữa công thái học cho những cuộc họp dài hạn, công nghệ hiện đại, vật liệu thượng hạng và quy mô biểu tượng mà mọi trụ sở tập đoàn đều hướng tới."
        ],
        "paragraphsEn": [
          "In crafting the Mergentia conference table, B+ON considered every determinant of high-level discourse: participant count, individual comfort zones, ergonomics, integrated technology, and executive prestige. Engineered across three dimensional scales, the flagship edition accommodates up to 18 delegates.",
          "For the expansive tabletop, we curated premium natural veneers and quartz agglomerate. Massive cylindrical pedestals are hand-wrapped in genuine Italian leather accented with artisanal saddlery stitching.",
          "Integrated into the center of the tabletop are flush-mounted connectivity hatches for technology and fast device charging. Everything remains at hand, while concealed conduits keep the work surface organized.",
          "Thus, Mergentia synthesizes ergonomic resilience for extended sessions, functional tech integration, noble natural materials, and an imposing architectural scale required for high-profile executive boardrooms."
        ],
        "linkTextVi": "Bàn họp Mergentia từ B+ON",
        "linkTextEn": "Mergentia Conference Table by B+ON",
        "linkUrl": "#/product/conference-table-mergentia-caramel",
        "image": "https://media.fiftyfourms.com/portfolio_2_37_ab4af08db3.webp",
        "captionVi": "Bàn họp Mergentia phiên bản đại sảnh sức chứa lên tới 18 vị trí",
        "captionEn": "Monumental Mergentia boardroom table seating up to 18 attendees"
      }
    ]
  },
  {
    "id": "how-to-create-personal-zones-within-a-room",
    "slug": "how-to-create-personal-zones-within-a-room",
    "titleVi": "Không Gian Cá Nhân Bên Trong Căn Phòng: Tiếp Cận Mới Về Phân Vùng Chức Năng",
    "titleEn": "Personal Sanctuaries Within a Room: A Fresh Approach to Micro-Zoning",
    "categoryVi": "Thiết Kế Không Gian",
    "categoryEn": "Spatial Design",
    "date": "8 Tháng 9, 2026",
    "dateEn": "September 8, 2026",
    "readTimeVi": "6 phút đọc",
    "readTimeEn": "6 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_6aac98dfbc.webp",
    "summaryVi": "Diện tích rộng rãi cho phép kiến trúc sư thiết kế không gian xoay quanh nhiều thói quen sinh hoạt khác nhau: phòng ngủ master tích hợp phòng khách riêng tư, góc đọc sách tĩnh lặng bên cửa sổ panorama.",
    "summaryEn": "Generous floorplans allow contemporary architects to tailor a room around multiple daily rituals: a master suite with an intimate lounge parlor, or a contemplative reading alcove.",
    "featuredProducts": [
      "Palatium Armchair",
      "Invito Deluxe Coffee Table",
      "Virgola Sofa"
    ],
    "tags": [
      "Micro-Zoning",
      "Master Bedroom",
      "Daybed",
      "Spatial Harmony"
    ],
    "sections": [
      {
        "headingVi": "Cách kiến tạo các kịch bản sống đa dạng trong một căn phòng",
        "headingEn": "Creating Secondary Living Scenarios in One Chamber",
        "contentVi": "Một căn phòng master rộng lớn không nên chỉ có giường ngủ. Việc bổ sung ghế thư giãn và bàn trà nhỏ tạo ra một khu vực trú ẩn thứ hai, nơi gia chủ có thể thưởng thức ly trà sớm hay đọc sách mà không làm phiền không gian nghỉ ngơi chính.",
        "contentEn": "An expansive master suite transcends singular utility. Integrating an armchair and compact side table establishes an autonomous haven for morning contemplation without disturbing the principal sleeping quarters."
      },
      {
        "headingVi": "Phòng ngủ Master tích hợp phòng khách thu nhỏ",
        "headingEn": "Master Suite Featuring Private Parlor",
        "contentVi": "Trong các dự án dinh thự hiện đại của Studia 54, phòng ngủ trở thành không gian nghỉ dưỡng biệt lập. Một góc sofa nhỏ với chất liệu vải Bouclé mềm mại và ánh đèn vàng ấm áp giúp gia chủ tái tạo năng lượng sau một ngày làm việc bận rộn.",
        "contentEn": "In contemporary luxury residences, the master chamber functions as a secluded retreat. A low-profile lounge chair arrangement draped in sensory bouclé fabric anchors an oasis of decompression before sleep."
      }
    ]
  },
  {
    "id": "colors-in-premium-interior-palette",
    "slug": "colors-in-premium-interior-palette",
    "titleVi": "Sắc Màu Trong Nội Thất Cao Cấp: Xu Hướng Thu–Đông 2026/2027",
    "titleEn": "Colors in Luxury Interiors: Autumn–Winter 2026/2027 Palette",
    "categoryVi": "Xu Hướng & Vật Liệu",
    "categoryEn": "Trends & Materials",
    "date": "4 Tháng 9, 2026",
    "dateEn": "September 4, 2026",
    "readTimeVi": "7 phút đọc",
    "readTimeEn": "7 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_15a7d76c30.webp",
    "summaryVi": "Bảng màu nội thất mùa Thu–Đông 2026/2027 trở nên sâu lắng và đằm thắm hơn. Tâm điểm là các gam màu xanh rêu mộc bản, sắc đỏ rượu vang Bordeaux và tông nâu đất ấm cúng.",
    "summaryEn": "The interior color spectrum for Autumn 2026 and Winter 2027 deepens toward organic complexity: rich olive moss, decadent wine burgundy, and velvety espresso earth tones.",
    "featuredProducts": [
      "Pianta Armchair",
      "Invito Deluxe Coffee Table",
      "Shamrock Dining Table"
    ],
    "tags": [
      "Color Palette",
      "Autumn Winter 2026",
      "Rotatus",
      "Warm Neutrals",
      "Bespoke Textiles"
    ],
    "sections": [
      {
        "headingVi": "Những sắc thái định hình mùa lễ hội & mùa lạnh",
        "headingEn": "Defining Tones of the Cold Season",
        "contentVi": "Sự đơn điệu của màu be trơn và xám lạnh đang nhường chỗ cho những gam màu có chiều sâu thị giác. Màu đỏ rượu vang đậm (Bordeaux/Vino) kết hợp cùng sắc xanh rêu sẫm và gỗ óc chó hun khói tạo nên vẻ đẹp vương giả mà vẫn ấm cúng.",
        "contentEn": "Flat sterile grays yield entirely to tactile warmth. Deep vintage burgundy tones interact with forest moss accents and smoked American timber, enveloping voluminous spaces with aristocratic intimacy."
      },
      {
        "headingVi": "Ứng dụng sắc màu biểu cảm trên các bộ sưu tập B+ON",
        "headingEn": "Expressing Pigment Depth in B+ON Collections",
        "contentVi": "B+ON mang đến bộ sưu tập hơn 200 mẫu da tự nhiên nubuck Ý và vải dệt cao cấp. Chiếc ghế xoay Rotatus trong sắc đỏ mận sẫm hay bàn trà Invito Deluxe mặt đá Calacatta tím trở thành điểm nhấn thị giác thu hút mọi ánh nhìn.",
        "contentEn": "B+ON curates over 200 Italian full-grain nubuck leathers and couture woven textiles. The Rotatus armchair rendered in deep mulberry velvet creates an irresistible visual magnet."
      }
    ]
  },
  {
    "id": "design-competitions-why-professionals-should-participate",
    "slug": "design-competitions-why-professionals-should-participate",
    "titleVi": "Các Cuộc Thi Thiết Kế & Kiến Trúc: Vì Sao Chuyên Gia Nên Tham Gia",
    "titleEn": "Design Competitions for Professionals: Why Established Architects Should Compete",
    "categoryVi": "Góc Nhìn Chuyên Gia",
    "categoryEn": "Expert Perspective",
    "date": "27 Tháng 8, 2026",
    "dateEn": "August 27, 2026",
    "readTimeVi": "5 phút đọc",
    "readTimeEn": "5 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_8b1259a704.webp",
    "summaryVi": "Tham gia các giải thưởng kiến trúc quốc tế không chỉ là cơ hội khẳng định uy tín nghề nghiệp mà còn là sân chơi giải phóng tư duy sáng tạo vượt khỏi khuôn khổ giới hạn của các bản vẽ thương mại.",
    "summaryEn": "Participating in esteemed international architecture awards serves not merely for accolades, but to pilot daring design paradigms unencumbered by restrictive client briefs.",
    "featuredProducts": [
      "Shamrock Dining Table",
      "Palatium Armchair"
    ],
    "tags": [
      "Architecture Awards",
      "Innovation",
      "Salone del Mobile",
      "Design Community"
    ],
    "sections": [
      {
        "headingVi": "Vai trò của các giải thưởng trong ngành công nghiệp sáng tạo",
        "headingEn": "The Institutional Role of Design Competitions",
        "contentVi": "Đối với các văn phòng thiết kế hàng đầu, việc tham dự các giải thưởng danh giá như Red Dot, iF Design hay Salone del Mobile Milano là cơ hội kết nối với các xưởng sản xuất công nghệ cao như B+ON để biến các ý tưởng đột phá thành sản phẩm thực tế.",
        "contentEn": "For seasoned studios, global competitions represent an experimental laboratory to showcase radical material techniques to elite fabrication ateliers capable of executing micron-level tolerances."
      }
    ]
  },
  {
    "id": "italian-furniture-after-2025-end-of-classic-luxury",
    "slug": "italian-furniture-after-2025-end-of-classic-luxury",
    "titleVi": "Nội Thất Ý Sau Năm 2025: Hồi Kết Của Phong Cách Xa Xỉ Cổ Điển?",
    "titleEn": "Italian Furniture After 2025: The Redefinition of High-End Luxury",
    "categoryVi": "Triết Lý Thiết Kế",
    "categoryEn": "Design Philosophy",
    "date": "25 Tháng 8, 2026",
    "dateEn": "August 25, 2026",
    "readTimeVi": "7 phút đọc",
    "readTimeEn": "7 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_01957949a6.webp",
    "summaryVi": "Các bộ sưu tập mới nhất từ Milan cho thấy: khái niệm xa xỉ phô trương mạ vàng nặng nề đã hoàn toàn nhường chỗ cho sự thanh thoát của hình khối điêu khắc và trải nghiệm xúc giác chân thực.",
    "summaryEn": "Contemporary Milanese collections reveal that classical gilt ostentation has decisively given way to monolithic architectural comfort and sensory material honesty.",
    "featuredProducts": [
      "Virgola Sofa",
      "Palatium Armchair",
      "Pianta Armchair"
    ],
    "tags": [
      "Italian Design",
      "Contemporary Luxury",
      "Salone del Mobile",
      "Sensory Comfort"
    ],
    "sections": [
      {
        "headingVi": "Thẩm mỹ mới của không gian nội thất siêu sang",
        "headingEn": "The New Aesthetic of Haute Interiors",
        "contentVi": "Đồ nội thất cao cấp đương đại không còn là những món đồ trưng bày bất khả xâm phạm. Người dùng thượng lưu đòi hỏi những bộ sofa êm ái như mây trời, nơi họ có thể ngả lưng đọc sách, làm việc cùng laptop hoặc quây quần cùng gia đình một cách thư thái nhất.",
        "contentEn": "Modern luxury furniture rejects museum stiffness. High-net-worth homeowners demand clouds of sublime ergonomic support where daily relaxation and casual living coalesce effortlessly."
      },
      {
        "headingVi": "Sofa như một ốc đảo kiến trúc trong phòng khách",
        "headingEn": "The Modular Sofa as an Architectural Island",
        "contentVi": "Bộ sofa Virgola của B+ON với các đường cong hữu cơ không chỉ lấp đầy không gian mà còn đóng vai trò phân luồng giao thông tự nhiên giữa phòng khách, sảnh thang và ban công ngắm cảnh.",
        "contentEn": "Biomorphic contours on the Virgola sofa gracefully define spatial circulation patterns in sprawling residential footprints without imposing rigid structural partitions."
      }
    ]
  },
  {
    "id": "designer-gifts-for-wedding-and-housewarming",
    "slug": "designer-gifts-for-wedding-and-housewarming",
    "titleVi": "Quà Tặng Tân Gia & Hôn Lễ: 5 Tác Phẩm Nội Thất Thiết Kế Độc Bản",
    "titleEn": "Gifts for the Modern Estate: 5 Curated Furniture Pieces for Weddings and Housewarmings",
    "categoryVi": "Bộ Sưu Tập Quà Tặng",
    "categoryEn": "Curated Gifts",
    "date": "18 Tháng 8, 2026",
    "dateEn": "August 18, 2026",
    "readTimeVi": "6 phút đọc",
    "readTimeEn": "6 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_e51a849472.webp",
    "summaryVi": "Tuyển tập 5 món đồ nội thất tinh xảo từ B+ON dễ dàng hoà nhập vào bất kỳ không gian biệt thự nào: từ gương nghệ thuật Lumen Glow đến đôn bọc da cao cấp.",
    "summaryEn": "Five bespoke B+ON accent items that integrate effortlessly into finished residences: from the illuminated Lumen Glow mirror to the sculptural leather pouf.",
    "featuredProducts": [
      "Invito Deluxe Coffee Table",
      "Palatium Armchair",
      "Pianta Armchair"
    ],
    "tags": [
      "Housewarming Gifts",
      "Wedding Presents",
      "Curated Accents",
      "B+ON"
    ],
    "sections": [
      {
        "headingVi": "Cách lựa chọn món quà nội thất trường tồn cùng thời gian",
        "headingEn": "Selecting Timeless Heirloom Objects",
        "contentVi": "Một món quà nội thất đỉnh cao không chỉ là kỷ vật mà còn là tác phẩm nghệ thuật gia truyền. Những món đồ như bàn trà đá marble hay ghế bành da bò Ý sở hữu kích thước vừa vặn và thẩm mỹ tinh giản, thích hợp với mọi phong cách bài trí.",
        "contentEn": "An exceptional heirloom gift provides both instant utility and generational beauty. Pieces like marble cocktail tables or Italian leather armchairs fit organically into master bedrooms, dressing suites, or entrance galleries."
      }
    ]
  },
  {
    "id": "interior-trends-2026-2027-outdated-design-trends",
    "slug": "interior-trends-2026-2027-outdated-design-trends",
    "titleVi": "Xu Hướng Nội Thất 2026–2027: Những Thay Đổi Về Màu Sắc, Đồ Rời & Kỹ Nghệ Vật Liệu",
    "titleEn": "Interior Trends 2026–2027: The Evolution of Hue, Furnishings & Material Craft",
    "categoryVi": "Xu Hướng Thiết Kế",
    "categoryEn": "Design Trends",
    "date": "17 Tháng 8, 2026",
    "dateEn": "August 17, 2026",
    "readTimeVi": "7 phút đọc",
    "readTimeEn": "7 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_d8398ac993.webp",
    "summaryVi": "Xu hướng nội thất cao cấp đang bước vào giai đoạn chuyển giao mạnh mẽ: chủ nghĩa tối giản đơn điệu nhường chỗ cho các khối màu tương phản sâu, mặt bàn đá tự nhiên vân lớn và chi tiết kim loại gia công thủ công.",
    "summaryEn": "Luxury residential design experiences an invigorating evolution: sterile monochromatic austerity surrenders to expressive statement stones and bespoke metalwork.",
    "featuredProducts": [
      "Invito Deluxe Coffee Table",
      "Palatium Armchair",
      "Shamrock Dining Table"
    ],
    "tags": [
      "Design Trends 2026",
      "Material Innovation",
      "Color Accents",
      "B+ON"
    ],
    "sections": [
      {
        "headingVi": "Sắc màu vượt qua giới hạn của bảng màu trung tính đơn điệu",
        "headingEn": "Color Expands Beyond Neutral Bounds",
        "contentVi": "Không gian sống hiện đại không còn bằng lòng với những bức tường xám và đồ gỗ đơn sắc. Bàn trà phủ lớp sơn mài bóng bẩy màu đỏ mận Royal Amaranth hay đá Calacatta tím tạo nên cú hích thị giác đầy mê hoặc.",
        "contentEn": "After years of muted beige monotony, commanding pigments take center stage. Cocktail tables finished in mirror-gloss Royal Amaranth anchor the salon with vibrant authority."
      }
    ]
  },
  {
    "id": "loud-luxury-premium-interior-trend-2026",
    "slug": "loud-luxury-premium-interior-trend-2026",
    "titleVi": "Sự Trở Lại Của Tính Biểu Đạt: Vì Sao Nội Thất Cao Cấp Ngày Càng Giàu Cá Tính",
    "titleEn": "The Return of Expressive Grandeur: Why High-End Interiors Embrace Bold Statements",
    "categoryVi": "Xu Hướng Cao Cấp",
    "categoryEn": "Luxury Trends",
    "date": "11 Tháng 8, 2026",
    "dateEn": "August 11, 2026",
    "readTimeVi": "7 phút đọc",
    "readTimeEn": "7 min read",
    "coverImage": "https://media.fiftyfourms.com/16h10_oblozhka_5b7bb87894.webp",
    "summaryVi": "Sau nhiều năm tôn sùng sự ẩn mình khiêm tốn (quiet luxury), giới tinh hoa thế giới đang tìm lại niềm vui trong việc khẳng định phong cách sống độc bản thông qua các hình khối điêu khắc và vật liệu quý hiếm.",
    "summaryEn": "Following an era of discreet understatement, visionary homeowners embrace dramatic architectural scale, rare geological specimens, and expressive sculptural furniture.",
    "featuredProducts": [
      "Virgola Sofa",
      "Pianta Armchair",
      "Shamrock Dining Table"
    ],
    "tags": [
      "Loud Luxury",
      "Sculptural Furniture",
      "Virgola",
      "Pianta",
      "Statement Interiors"
    ],
    "sections": [
      {
        "headingVi": "Sau chủ nghĩa tối giản, không gian cần tìm lại cá tính",
        "headingEn": "Beyond Minimalism: Restoring Character to Space",
        "contentVi": "Sự đơn giản hoá quá mức khiến nhiều căn penthouse trông giống như các sảnh khách sạn vô danh. Khách hàng của B+ON mong muốn những tuyệt phẩm như chiếc ghế bành Pianta hay bộ sofa Virgola uốn lượn — những tác phẩm nghệ thuật kích thích giác quan ngay khi bước vào sảnh.",
        "contentEn": "Hyper-minimalism ended in sterile sameness. Discerning patrons demand furniture charged with visceral character, such as the biomorphic Pianta armchair and sinuous Virgola sofa landscape."
      },
      {
        "headingVi": "Nội thất điêu khắc đóng vai trò tâm điểm không gian",
        "headingEn": "Sculptural Pieces as Visual Dominants",
        "contentVi": "Mỗi món đồ rời B+ON được tạo hình để đẹp ở góc nhìn 360 độ trong các không gian mở rộng lớn, kết hợp hài hoà giữa tỷ lệ hoành tráng và sự thanh thoát kỳ diệu.",
        "contentEn": "B+ON masterworks are conceived as freestanding sculptures in the round, captivating observer perspectives from every architectural threshold."
      }
    ]
  }
];
