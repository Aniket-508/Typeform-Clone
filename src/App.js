import { useRef, useState, useEffect } from "react";

import Navbar from "./components/navbar";
import Progress from "./components/ui/progress";
import Section from "./components/ui/section";
import Button from "./components/ui/button";
import ErrorMsg from "./components/ui/errormsg";

import useOutsideAlerter from "./hooks/useOutsideAlerter";
import { cn } from "./utils/helper";

import { industriesData } from "./constants/industries";
import { countriesData } from "./constants/countries";
import { rolesData } from "./constants/roles";
import { goalsData } from "./constants/goals";

export default function App() {
  const [selectBlock, setSelectedBlock] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [roleActive, setRoleActive] = useState("");
  const [goals, setGoals] = useState([]);
  const [submitScreen, setSubmitScreen] = useState(false);
  const [searchCountryValue, setSearchCountryValue] = useState("");
  const [searchCountryModal, setSearchCountryModal] = useState(false);
  const [country, setCountry] = useState({
    name: "India",
    code: "IN",
    phone: 91,
  });
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const [widthArray, setWidthArray] = useState([0, 0, 0, 0, 0, 0, 0]);
  const topWidthBar = widthArray.reduce((partialSum, a) => partialSum + a, 0);

  useEffect(() => {
    let tmpArr = [...widthArray];
    if (formValues.firstName !== "") {
      tmpArr[0] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[0] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.lastName !== "") {
      tmpArr[1] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[1] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.email !== "") {
      tmpArr[2] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[2] = 0;
      setWidthArray(tmpArr);
    }
    if (formValues.phone !== "") {
      tmpArr[3] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[3] = 0;
      setWidthArray(tmpArr);
    }
    if (searchInput !== "") {
      tmpArr[4] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[4] = 0;
      setWidthArray(tmpArr);
    }
    if (roleActive) {
      tmpArr[5] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[5] = 0;
      setWidthArray(tmpArr);
    }
    if (goals.length !== 0) {
      tmpArr[6] = 1;
      setWidthArray(tmpArr);
    } else {
      tmpArr[6] = 0;
      setWidthArray(tmpArr);
    }
  }, [formValues, searchInput, roleActive, goals]);

  const inputRef = useRef(null);
  const firstNameInputRef = useRef(null);
  const lastNameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const phoneInputRef = useRef(null);
  const roleRef = useRef(null);
  const goalsRef = useRef(null);
  const searchInputRef = useRef(null);
  const searchCountryModalRef = useRef(null);
  useOutsideAlerter(searchCountryModalRef, setSearchCountryModal);

  const goalCount =
    goals.length === 2 ? false : goals.length === 1 ? "1 more" : "2";

  useEffect(() => {
    if (selectBlock === true) {
      inputRef.current.focus();
    }
    if (searchCountryModal === true) {
      searchInputRef.current.focus();
    }
  }, [selectBlock, searchCountryModal]);

  function handleSelectBlockClick(item) {
    setSelectedBlock(false);
    setSearchInput(item);
    roleRef.current.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }

  const [errorMsg, setErrorMsg] = useState({
    firstName: false,
    lastName: false,
    email: false,
    phone: false,
    industry: false,
    role: false,
    goals: false,
  });

  const handleSubmit = () => {
    if (formValues.firstName === "") {
      setErrorMsg({ ...errorMsg, firstName: true });
      firstNameInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      firstNameInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.lastName === "") {
      setErrorMsg({ ...errorMsg, lastName: true });
      lastNameInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      lastNameInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.email === "") {
      setErrorMsg({ ...errorMsg, email: true });
      emailInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      emailInputRef.current.focus({
        preventScroll: true,
      });
    } else if (formValues.phone === "") {
      setErrorMsg({ ...errorMsg, phone: true });
      phoneInputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      phoneInputRef.current.focus({
        preventScroll: true,
      });
    } else if (searchInput === "") {
      setErrorMsg({ ...errorMsg, industry: true });
      inputRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      inputRef.current.focus({
        preventScroll: true,
      });
    } else if (roleActive === "") {
      setErrorMsg({ ...errorMsg, role: true });
      roleRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      roleRef.current.focus({
        preventScroll: true,
      });
    } else if (goals.length === 0) {
      setErrorMsg({ ...errorMsg, goals: true });
      goalsRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      goalsRef.current.focus({
        preventScroll: true,
      });
    } else {
      fetch("https://eo3oi83n1j77wgp.m.pipedream.net", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          email: formValues.email,
          phone: formValues.phone,
          industry: searchInput,
          roleActive: roleActive,
          goals: goals,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          setSubmitScreen(true);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  return (
    <div className="bg-black pt-5 p-4 relative flex flex-col h-screen overflow-y-auto snap-y snap-mandatory">
      {!submitScreen && <Progress width={topWidthBar} total={7} />}
      <Navbar />
      {!submitScreen && (
        <>
          <Section>
            <Section.Title>Up-skilling requires time commitment</Section.Title>
            <br />
            <div className="text-base md:text-xl opacity-70">
              <p>
                This experience is designed by keeping in mind the working hours
                founders & full time operators typically work in.
              </p>
              <br />
              <p>You will spend</p>
              <p>- 6 hours/week for the first 5 weeks</p>
              <p>- 15 hours/week for the last 3 weeks</p>
            </div>
            <br />
            <Button
              btnText={"I agree"}
              action={() => {
                firstNameInputRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                firstNameInputRef.current.focus({
                  preventScroll: true,
                });
              }}
            />
          </Section>
          <Section>
            <Section.Question>1</Section.Question>
            <Section.Title>What's your first name? *</Section.Title>
            <br />
            <Section.Input
              type="text"
              ref={firstNameInputRef}
              placeholder="Type your answer here"
              onChange={(e) =>
                setFormValues({ ...formValues, firstName: e.target.value })
              }
            />
            {errorMsg.firstName && formValues.firstName === "" && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                lastNameInputRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                lastNameInputRef.current.focus({
                  preventScroll: true,
                });
              }}
            />
          </Section>
          <Section>
            <Section.Question>2</Section.Question>
            <Section.Title>
              and your last name, {formValues.firstName && formValues.firstName}
              ?*
            </Section.Title>
            <br />
            <Section.Input
              type="text"
              ref={lastNameInputRef}
              placeholder="Type your answer here"
              onChange={(e) =>
                setFormValues({ ...formValues, lastName: e.target.value })
              }
            />
            {errorMsg.lastName && formValues.lastName === "" && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                inputRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                inputRef.current.focus({
                  preventScroll: true,
                });
              }}
            />
          </Section>
          <Section className="outline-none" tabIndex="0">
            <Section.Question>3</Section.Question>
            <Section.Title className="mb-2">
              What industry is your company in? *
            </Section.Title>
            <Section.Description>
              We will personalize your learning experience accordingly
            </Section.Description>
            <br />
            <div
              className={`${
                selectBlock || searchInput ? "opacity-100" : "opacity-70"
              } flex items-center justify-between border-b`}
            >
              <input
                type="text"
                className="w-full block bg-transparent pb-1 text-2xl md:text-4xl focus:outline-none"
                placeholder="Type or select an option"
                onChange={(e) => setSearchInput(e.target.value)}
                ref={inputRef}
                value={searchInput}
                onFocus={() => setSelectedBlock(true)}
              />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={cn(
                  "h-6 w-6 cursor-pointer",
                  !selectBlock && "rotate-180"
                )}
                viewBox="0 0 20 20"
                fill="currentColor"
                onClick={() => setSelectedBlock((prev) => !prev)}
              >
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            {selectBlock && (
              <div className="block overflow-y-auto max-h-52 space-y-1 mt-1">
                {industriesData
                  .filter((industry) =>
                    industry.toLowerCase().includes(searchInput.toLowerCase())
                  )
                  .map((item, idx) => (
                    <p
                      key={idx}
                      className="border border-white px-3 py-1 rounded-md text-base md:text-xl bg-[#211f1f] cursor-pointer hover:bg-[#4D4D4D]"
                      onClick={() => {
                        handleSelectBlockClick(item);
                      }}
                    >
                      {item}
                    </p>
                  ))}
              </div>
            )}
            {errorMsg.industry && searchInput === "" && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                roleRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            />
          </Section>
          <Section ref={roleRef} tabIndex="0">
            <Section.Question>4</Section.Question>
            <Section.Title className="mb-2">
              Your role in your company? *
            </Section.Title>
            <Section.Description>
              We want to understand how you spend your time right now.
            </Section.Description>
            <br />
            <Section.Description className="italic">
              [ 🔴DEVELOPER NOTICE: Options in the questions ahead depend on
              this question's response/s. ]
            </Section.Description>
            <br />
            <div className="space-y-2">
              {rolesData.map((role) => (
                <Section.Options
                  key={role.id}
                  active={roleActive === role.name}
                  option={role}
                  onClick={() => {
                    if (roleActive === role.name) {
                      setRoleActive(null);
                    } else {
                      setRoleActive(role.name);
                    }
                  }}
                />
              ))}
            </div>
            {errorMsg.role && roleActive === "" && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                goalsRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
              }}
            />
          </Section>
          <Section ref={goalsRef} tabIndex="0">
            <Section.Question>5</Section.Question>
            <Section.Title className="mb-2">
              {formValues.firstName
                ? `${formValues.firstName}, what's`
                : `What's`}{" "}
              your professional goal for the next 12 months? *
            </Section.Title>
            <br />
            {goalCount && <p className="text-sm mb-2">Choose {goalCount}</p>}
            <div className="space-y-2">
              {goalsData.map((goal) => (
                <Section.Options
                  key={goal.id}
                  active={goals.includes(goal.name)}
                  option={goal}
                  className="md:max-w-[55%]"
                  onClick={() => {
                    if (goals.includes(goal.name)) {
                      setGoals(goals.filter((item) => item !== goal.name));
                    } else {
                      setGoals([...goals, goal.name]);
                    }
                  }}
                />
              ))}
            </div>
            {errorMsg.goals && goalCount !== false && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                emailInputRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                emailInputRef.current.focus({
                  preventScroll: true,
                });
              }}
            />
          </Section>
          <Section>
            <Section.Question>6</Section.Question>
            <Section.Title className="mb-2">
              Email you'd like to register with? *
            </Section.Title>
            <Section.Description>
              We will keep all our communications with you through this email.
              Do check your spam inbox if you can't find our application
              received email.
            </Section.Description>
            <br />
            <Section.Description className="italic">
              [ 🔴DEVELOPER NOTICE: Options in the questions ahead depend on
              this question's response/s. ]
            </Section.Description>
            <br />

            <Section.Input
              type="email"
              ref={emailInputRef}
              placeholder="name@example.com"
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
            />
            {errorMsg.email && formValues.email === "" && <ErrorMsg />}
            <br />
            <Button
              tick={true}
              action={() => {
                phoneInputRef.current.scrollIntoView({
                  behavior: "smooth",
                  block: "center",
                });
                phoneInputRef.current.focus({
                  preventScroll: true,
                });
              }}
            />
          </Section>
          <Section>
            <Section.Question>7</Section.Question>
            <Section.Title className="mb-2">Your phone number *</Section.Title>
            <Section.Description>
              We won't call you unless it is absolutely required to process your
              application.
            </Section.Description>
            <br />
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1 border-b md:pt-[6px] pb-[5px] md:pb-[6px] relative">
                {searchCountryModal && (
                  <div
                    className="absolute top-0 -left-10 md:left-0 w-[100vw] h-[45vh] md:w-96 md:h-48 px-4 py-2 border border-white rounded-md z-10 bg-black overflow-y-auto"
                    ref={searchCountryModalRef}
                  >
                    <input
                      type="text"
                      value={searchCountryValue}
                      ref={searchInputRef}
                      className="w-full block bg-transparent pb-1 text-xl md:text-3xl opacity-70 focus-within:opacity-100 focus:outline-none focus:border-b-white"
                      placeholder="Search countries"
                      onChange={(e) => setSearchCountryValue(e.target.value)}
                    />
                    <div className="space-y-1 mt-1">
                      {countriesData
                        .filter((country) =>
                          country.name
                            .toLowerCase()
                            .includes(searchCountryValue)
                        )
                        .map((country, idx) => (
                          <div
                            key={idx}
                            className="flex items-center justify-between py-1 px-2 border border-white rounded-md bg-[#211f1f] cursor-pointer hover:bg-[#4D4D4D]"
                            onClick={() => {
                              setCountry({
                                name: country.name,
                                code: country.code,
                                phone: country.phone,
                              });
                              setSearchCountryModal(false);
                            }}
                          >
                            <div className="flex items-center space-x-2">
                              <img
                                src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                                className="w-8 rounded border"
                                alt={`${country.name} flag`}
                              />
                              <p className="text-base md:text-xl">
                                {country.name}
                              </p>
                            </div>
                            <p className="text-base md:text-xl">
                              +{country.phone}
                            </p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
                <img
                  src={`https://flagcdn.com/${country.code.toLowerCase()}.svg`}
                  className="w-8 rounded border"
                  alt={`${country.name} flag`}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 cursor-pointer"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  onClick={() => {
                    setSearchCountryModal(true);
                  }}
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <Section.Input
                type="number"
                ref={phoneInputRef}
                placeholder="081234 56789"
                onChange={(e) =>
                  setFormValues({
                    ...formValues,
                    phone: `+${country.phone}${e.target.value}`,
                  })
                }
              />
            </div>
            {errorMsg.phone && formValues.phone === "" && <ErrorMsg />}
            <br />
            <Button btnText={"Submit"} action={handleSubmit} />
          </Section>
        </>
      )}
      {submitScreen && (
        <Section>
          <Section.Title>All done! Thanks for your time.</Section.Title>
        </Section>
      )}
    </div>
  );
}
