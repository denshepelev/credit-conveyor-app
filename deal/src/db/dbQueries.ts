//⭐
const createDB = (dnName: string, owner: string): string => {
  return `CREATE DATABASE ${dnName}
    WITH
    OWNER = ${owner}
    ENCODING = 'UTF8'
    CONNECTION LIMIT = -1
    IS_TEMPLATE = False;`;
};

//⭐
const createEmploymentStatus = `
-- Table: public.employment_status

-- DROP TABLE IF EXISTS public.employment_status;

CREATE TABLE IF NOT EXISTS public.employment_status
(
    employment_status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT employment_status_pkey PRIMARY KEY (employment_status)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employment_status
    OWNER to root;`;

//⭐
const fillEmploymentStatus = `
INSERT INTO employment_status
VALUES ('UNEMPLOYED');
INSERT INTO employment_status
VALUES ('SELF_EMPLOYED');
INSERT INTO employment_status
VALUES ('EMPLOYED');
INSERT INTO employment_status
VALUES ('BUSINESS_OWNER');`;

//⭐
const createEmploymentPosition = `
-- Table: public.employment_position

-- DROP TABLE IF EXISTS public.employment_position;

CREATE TABLE IF NOT EXISTS public.employment_position
(
    employment_position character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT employment_position_pkey PRIMARY KEY (employment_position)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employment_position
    OWNER to root;`;

//⭐
const fillEmploymentPosition = `
INSERT INTO employment_position
VALUES ('WORKER');
INSERT INTO employment_position
VALUES ('MID_MANAGER');
INSERT INTO employment_position
VALUES ('TOP_MANAGER');
INSERT INTO employment_position
VALUES ('OWNER');`;

//⭐
const createGender = `
-- Table: public.gender

-- DROP TABLE IF EXISTS public.gender;

CREATE TABLE IF NOT EXISTS public.gender
(
    gender character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT gender_pkey PRIMARY KEY (gender)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.gender
    OWNER to root;`;

//⭐
const fillGender = `
INSERT INTO GENDER
VALUES ('MALE');
INSERT INTO GENDER
VALUES ('FEMALE');
INSERT INTO GENDER
VALUES ('NON_BINARY');`;

//⭐
const createMaritalStatus = `
-- Table: public.marital_status

-- DROP TABLE IF EXISTS public.marital_status;

CREATE TABLE IF NOT EXISTS public.marital_status
(
    marital_status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT marital_status_pkey PRIMARY KEY (marital_status)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.marital_status
    OWNER to root;`;

//⭐
const fillMaritalStatus = `
INSERT INTO marital_status
VALUES ('MARRIED');
INSERT INTO marital_status
VALUES ('DIVORCED');
INSERT INTO marital_status
VALUES ('SINGLE');
INSERT INTO marital_status
VALUES ('WIDOW_WIDOWER');`;

//⭐
const createCreditStatus = `
-- Table: public.credit_status

-- DROP TABLE IF EXISTS public.credit_status;

CREATE TABLE IF NOT EXISTS public.credit_status
(
    credit_status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT credit_status_pkey PRIMARY KEY (credit_status)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.credit_status
    OWNER to root;`;

//⭐
const fillCreditStatus = `
INSERT INTO credit_status
VALUES ('CALCULATED');
INSERT INTO credit_status
VALUES ('ISSUED');`;

//⭐
const createApplicationStatus = `
-- Table: public.application_status

-- DROP TABLE IF EXISTS public.application_status;

CREATE TABLE IF NOT EXISTS public.application_status
(
    application_status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT application_status_pkey PRIMARY KEY (application_status)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.application_status
    OWNER to root;`;

//⭐
const fillApplicationStatus = `
INSERT INTO application_status
VALUES ('PREAPPROVAL');
INSERT INTO application_status
VALUES ('APPROVED');
INSERT INTO application_status
VALUES ('CC_DENIED');
INSERT INTO application_status
VALUES ('CC_APPROVED');
INSERT INTO application_status
VALUES ('PREPARE_DOCUMENTS');
INSERT INTO application_status
VALUES ('DOCUMENT_CREATED');
INSERT INTO application_status
VALUES ('CLIENT_DENIED');
INSERT INTO application_status
VALUES ('DOCUMENT_SIGNED');
INSERT INTO application_status
VALUES ('CREDIT_ISSUED');`;

//⭐
const createPassport = `
-- Table: public.passport

-- DROP TABLE IF EXISTS public.passport;

CREATE TABLE IF NOT EXISTS public.passport
(
    passport_id serial NOT NULL,
    series character varying(30) COLLATE pg_catalog."default" NOT NULL,
    issue_branch character varying(30) COLLATE pg_catalog."default",
    issue_date date,
    "number" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT passport_pkey PRIMARY KEY (passport_id),
    CONSTRAINT series_number UNIQUE (series, "number")
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.passport
    OWNER to root;`;

//⭐
const createEmployment = `
-- Table: public.employment

-- DROP TABLE IF EXISTS public.employment;

CREATE TABLE IF NOT EXISTS public.employment
(
    employment_id serial NOT NULL,
    status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    employer_inn character varying(30) COLLATE pg_catalog."default" NOT NULL,
    salary bigint NOT NULL,
    "position" character varying(30) COLLATE pg_catalog."default" NOT NULL,
    work_experience_total integer NOT NULL,
    work_experience_current integer NOT NULL,
    CONSTRAINT employment_pkey PRIMARY KEY (employment_id),
    CONSTRAINT "position" FOREIGN KEY ("position")
        REFERENCES public.employment_position (employment_position) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT status FOREIGN KEY (status)
        REFERENCES public.employment_status (employment_status) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.employment
    OWNER to root;`;

//⭐
const createClient = `
-- Table: public.client

-- DROP TABLE IF EXISTS public.client;

CREATE TABLE IF NOT EXISTS public.client
(
    client_id serial NOT NULL,
    last_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    first_name character varying(30) COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::bpchar,
    birth_date date NOT NULL,
    email character varying(30) COLLATE pg_catalog."default" NOT NULL,
    gender character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::bpchar,
    marital_status character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::bpchar,
    dependent_amount integer,
    passport_id integer,
    employment_id integer,
    account character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::bpchar,
    CONSTRAINT client_pkey PRIMARY KEY (client_id),
    CONSTRAINT email UNIQUE (email),
    CONSTRAINT employment_id FOREIGN KEY (employment_id)
        REFERENCES public.employment (employment_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT gender FOREIGN KEY (gender)
        REFERENCES public.gender (gender) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT marital_status FOREIGN KEY (marital_status)
        REFERENCES public.marital_status (marital_status) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT passport_id FOREIGN KEY (passport_id)
        REFERENCES public.passport (passport_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.client
    OWNER to root;`;

//⭐
const createCredit = `
-- Table: public.credit

-- DROP TABLE IF EXISTS public.credit;

CREATE TABLE IF NOT EXISTS public.credit
(
    credit_id serial NOT NULL,
    amount numeric NOT NULL,
    term integer NOT NULL,
    monthly_payment numeric NOT NULL,
    rate numeric NOT NULL,
    psk numeric NOT NULL,
    payment_schedule jsonb NOT NULL,
    insurance_enable boolean NOT NULL,
    salary_client boolean NOT NULL,
    credit_status character varying(30) COLLATE pg_catalog."default",
    CONSTRAINT credit_pkey PRIMARY KEY (credit_id),
    CONSTRAINT credit_status FOREIGN KEY (credit_status)
        REFERENCES public.credit_status (credit_status) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.credit
    OWNER to root;`;

//⭐
const createApplication = `
-- Table: public.application

-- DROP TABLE IF EXISTS public.application;

CREATE TABLE IF NOT EXISTS public.application
(
    application_id serial NOT NULL,
    client_id integer NOT NULL,
    credit_id integer,
    status character varying(30) COLLATE pg_catalog."default" NOT NULL,
    creation_date date NOT NULL,
    applied_offer jsonb,
    sign_date date,
    ses_code character varying(30) COLLATE pg_catalog."default" DEFAULT NULL::bpchar,
    status_history jsonb,
    CONSTRAINT application_pkey PRIMARY KEY (application_id),
    CONSTRAINT client_id FOREIGN KEY (client_id)
        REFERENCES public.client (client_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT credit_id FOREIGN KEY (credit_id)
        REFERENCES public.credit (credit_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT status FOREIGN KEY (status)
        REFERENCES public.application_status (application_status) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.application
    OWNER to root;`;

//⭐
const clearDB = `
DELETE FROM application;
DELETE FROM client;
DELETE FROM passport;
DELETE FROM employment;
DELETE FROM credit;`;

//⭐
const createRole = `
-- Table: public.role

-- DROP TABLE IF EXISTS public.role;

CREATE TABLE IF NOT EXISTS public.role
(
    role_id character varying(10) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT role_pkey PRIMARY KEY (role_id)
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.role
    OWNER to root;`;

//⭐
const fillRole = `
INSERT INTO role
VALUES ('admin');
INSERT INTO role
VALUES ('client');`;

//⭐
const createUsers = `
-- Table: public.users

-- DROP TABLE IF EXISTS public.users;

CREATE TABLE IF NOT EXISTS public.users
(
    user_id serial NOT NULL,
    login character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    first_name character varying COLLATE pg_catalog."default" NOT NULL,
    second_name character varying COLLATE pg_catalog."default" NOT NULL,
    middle_name character varying COLLATE pg_catalog."default",
    role_id character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT users_pkey PRIMARY KEY (user_id),
    CONSTRAINT login UNIQUE (login),
    CONSTRAINT role_id FOREIGN KEY (role_id)
        REFERENCES public.role (role_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.users
    OWNER to root;`;

//⭐
const clearAuthDB = `
DELETE FROM users;`;

export {
  createDB,
  createEmploymentStatus,
  fillEmploymentStatus,
  createEmploymentPosition,
  fillEmploymentPosition,
  createGender,
  fillGender,
  createMaritalStatus,
  fillMaritalStatus,
  createCreditStatus,
  fillCreditStatus,
  createApplicationStatus,
  fillApplicationStatus,
  createPassport,
  createEmployment,
  createClient,
  createCredit,
  createApplication,
  clearDB,
  createRole,
  fillRole,
  createUsers,
  clearAuthDB,
};
