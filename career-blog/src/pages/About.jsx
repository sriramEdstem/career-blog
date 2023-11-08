import Header from "../components/Header/Header";
import cat from "../assets/images.jpg";

const About = () => {
  return (
    <>
      <Header></Header>
      <div className=" w-[100vh] flex flex-col gap-10 mt-10 items-center mx-auto">
        <h1 className=" text-4xl">Fluffy McFlufferson</h1>
        <img src={cat} alt="cat"></img>
        <div>
          <p>
            I am a cat who loves to code. I have been programming since I was a
            kitten, and I enjoy solving complex problems with elegant solutions.
          </p>
          <p>
            I have experience in web development, data science, machine
            learning, and artificial intelligence. I am proficient in Python,
            JavaScript, HTML, CSS, and SQL. I am also familiar with frameworks
            and libraries such as Django, React, TensorFlow, and PyTorch.
          </p>
          <p>
            I am always eager to learn new skills and technologies, and I am
            passionate about creating innovative and user-friendly applications.
          </p>
        </div>
        <div>
          <h1>Projects</h1>
          <div>
            <p>ProjectsCatnipCatnip</p>
            <p>
              It is a social media platform for cats. It allows users to create
              profiles, upload photos and videos, follow other cats, like and
              comment on posts, and chat with friends. Catnip uses Django for
              the backend, React for the frontend, and PostgreSQL for the
              database. It also implements machine learning models to provide
              personalized recommendations, sentiment analysis, and image
              recognition.
            </p>
          </div>
          <div>
            <p>ProjectsCatnipCatnip</p>
            <p>
              It is a social media platform for cats. It allows users to create
              profiles, upload photos and videos, follow other cats, like and
              comment on posts, and chat with friends. Catnip uses Django for
              the backend, React for the frontend, and PostgreSQL for the
              database. It also implements machine learning models to provide
              personalized recommendations, sentiment analysis, and image
              recognition.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
