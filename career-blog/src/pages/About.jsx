import Header from "../components/Header/Header";
import cat from "../assets/images.jpg";

const About = () => {
  return (
    <>
      <Header></Header>
      <div className=" w-[100vh] flex flex-col gap-10 mt-10 items-center mx-auto">
        <h1 className=" text-4xl">BOB</h1>
        <img src={cat} alt="cat"></img>
        <div>
          <p>
            <span className=" font-bold text-lg">I am</span> a cat who loves to
            code. I have been programming since I was a kitten, and I enjoy
            solving complex problems with elegant solutions.
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
          <h1 className=" mx-5 my-5 font-bold text-2xl">Projects</h1>
          <div>
            <p className="my-5 font-bold text-xl">ProjectsCatnipCatnip</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div>
            <p className="my-5 font-bold text-xl">PurrfectPurrfect</p>
            <p>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industrys standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
