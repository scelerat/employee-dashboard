import { db } from './database'

export async function seed() {
  const insertedDepartments = await db.insertInto('department')
    .values([
      { name: 'Engineering' },
      { name: 'Finance' },
      { name: 'Human Resources' },
      { name: 'Marketing' },
      { name: 'Operations' },
    ])
    .returning(['id', 'name'])
    .execute()
  const insertedEmployees = await db.insertInto('employee')
    .values([{
      name: 'Alice',
      department_id: insertedDepartments[0].id,
      position: 'Director',
      bio: "Alice is a dynamic leader and accomplished engineer, currently serving as the Director of Engineering at our organization. She holds a degree from UCLA, where she honed her technical skills and passion for innovation. With a decade of experience in the field, Alice brings a wealth of knowledge and expertise to her role. Her leadership is marked by a commitment to excellence, fostering collaboration, and driving results. Alice's strategic vision and dedication to pushing the boundaries of technology make her an invaluable asset to our team.",
      active: true,
      salary: 180000,
    }, {
      name: 'Bob',
      department_id: insertedDepartments[1].id,
      position: 'Accountant',
      bio: "Bob is a dedicated accountant within our finance department, bringing precision and reliability to his role. He graduated from Boise State University with a degree in accounting, laying the foundation for his professional journey. Beyond his financial acumen, Bob is known for his athleticism and active lifestyle. Whether he's hitting the gym or engaging in outdoor activities, his commitment to fitness underscores his disciplined approach to both work and life. Bob's blend of financial expertise and physical vitality adds a unique dimension to our team dynamic.",
      active: true,
      salary: 90000,
    }, {
      name: 'Samantha',
      department_id: insertedDepartments[2].id,
      position: 'Vice President',
      bio: "Samantha is the vibrant Vice President of Human Resources at our organization, driving our people-centric initiatives with passion and purpose. With a background in organizational psychology and a master's degree from Stanford University, she brings a deep understanding of human behavior to her role. Samantha is known for her innovative approach to talent management and her ability to cultivate a thriving workplace culture. \n\n Beyond her professional accomplishments, Samantha has an unusual hobby that sets her apart: she's an avid beekeeper. Tending to her hives provides her with a unique sense of tranquility and connection to nature. Samantha's dedication to her bees mirrors her commitment to nurturing the growth and well-being of our employees. Her ability to balance the demands of her busy career with her passion for beekeeping exemplifies her multifaceted approach to life.",
      active: true,
      salary: 200000,
    }, {
      name: 'Ernesto',
      department_id: insertedDepartments[3].id,
      position: 'Chief Analyst',
      bio: "Ernesto is the dynamic Marketing Guru at our organization, renowned for his strategic vision and creative brilliance. Armed with a degree in marketing from a prestigious university, Ernesto has consistently elevated our brand with his innovative campaigns and insightful strategies. His keen understanding of consumer behavior and market trends has propelled our company to new heights, driving growth and brand recognition. \n\n With a global mindset and fluency in multiple languages, Ernesto brings a unique perspective to his work, allowing him to connect with diverse audiences around the world. His ability to craft compelling narratives and engage with customers across cultural boundaries has been instrumental in expanding our reach and influence. \n\n Ernesto's dedication to excellence and his relentless pursuit of innovation make him an invaluable asset to our team. Whether he's spearheading a new marketing initiative or collaborating with colleagues to develop breakthrough ideas, his passion for driving results shines through in everything he does.",
      active: true,
      salary: 145000,
    }, {
      name: 'Peter',
      department_id: insertedDepartments[4].id,
      position: 'Executive Assistant',
      bio: "Peter is the dedicated Executive Assistant to the VP of Finance at our organization, bringing efficiency and organization to the heart of our financial operations. A recent addition to our team, Peter impressed us with his exceptional performance during his summer internship, demonstrating a keen eye for detail and a proactive approach to his work. \n\n Currently pursuing his degree in finance from a reputable university, Peter's internship experience provided him with valuable insights into our company's operations and culture, laying the foundation for his current role. As the right-hand support to the VP of Finance, Peter plays a crucial role in streamlining administrative tasks, managing schedules, and facilitating communication within the finance department. \n\n With a commitment to excellence and a willingness to take on new challenges, Peter continues to prove himself as a valuable asset to our team. His professionalism, coupled with his strong work ethic, ensures that he consistently delivers results and exceeds expectations in his role as Executive Assistant.",
      active: true,
      salary: 50000,
    },
    ])
    .execute()
}

seed();
