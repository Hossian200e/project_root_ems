import React, { useState, useEffect } from "react";
import "../../../assets/styles/admin/globalConfigurations/instituteSetup/profileSetup.css";

const API_URL = "http://localhost:5000/api/globalConfiguration/profileSetup";
const FILE_BASE_URL = "http://localhost:5000/uploads/profile/";

const fileFields = [
  "mission_img","mission_msg_img","vision_img","vision_msg_img",
  "approach_img","approach_msg_img","welcome_img","about_img",
  "principal_img","principal_says_img","vp_img","vp_says_img",
  "person_one_img","person_one_says_img","person_two_img","person_two_says_img",
  "rules_pdf","logo","principal_signature","convener_signature",
  "headmaster_signature","guide_teacher_signature","exam_controller_signature",
  "header_img"
];

// ===========================
//     REUSABLE COMPONENTS 
// ===========================

const TextInput = ({ label, name, value, onChange, type = "text", placeholder = "", required = false }) => (
  <div className="form-group">
    <label>
      {label} {required && <span className="text-red">*</span>}
    </label>
    <input
      name={name}
      value={value ?? ""}
      type={type}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

const TextArea = ({ label, name, value, onChange, placeholder = "", required = false }) => (
  <div className="form-group full">
    <label>
      {label} {required && <span className="text-red">*</span>}
    </label>
    <textarea
      name={name}
      value={value ?? ""}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    ></textarea>
  </div>
);

const FileInput = ({ label, name, preview, onFileSelect, accept }) => (
  <div className="form-group">
    <label>{label}</label>
    <input
      type="file"
      name={name}
      accept={accept}
      onChange={onFileSelect}
    />
    {preview && (
      <>
        {accept?.includes("image") ? (
          <a href={preview} target="_blank" rel="noreferrer">
            <img src={preview} alt={name} className="preview" />
          </a>
        ) : (
          <a href={preview} target="_blank" rel="noreferrer">View File</a>
        )}
      </>
    )}
  </div>
);

// ===========================
//     MAIN COMPONENT
// ===========================
const ProfileSetup = () => {
  const [form, setForm] = useState({});
  const [files, setFiles] = useState({});
  const [previews, setPreviews] = useState({});

  // ---------------- Load Profile Data & Previews ----------------
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch profile data");
        const data = await res.json();
        setForm(data);

        const p = {};
        fileFields.forEach((field) => {
          if (data[field]) p[field] = FILE_BASE_URL + data[field];
        });
        setPreviews(p);
      } catch (error) {
        console.error(error);
      }
    };
    loadProfile();
  }, []);

  // ---------------- INPUT HANDLERS ----------------
  const handleInput = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const { name, files: selected } = e.target;
    if (!selected?.length) return;
    const file = selected[0];
    setFiles((prev) => ({ ...prev, [name]: file }));
    const url = URL.createObjectURL(file);
    setPreviews((prev) => ({ ...prev, [name]: url }));
  };

  // ---------------- SUBMIT HANDLER ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = new FormData();
      Object.entries(form).forEach(([k, v]) => body.append(k, v ?? ""));
      Object.entries(files).forEach(([k, v]) => v && body.append(k, v));

      const res = await fetch(API_URL, { method: "PUT", body });
      const data = await res.json();
      if (!res.ok) return alert(data.message || "Update failed");

      alert("Profile updated successfully!");
      localStorage.setItem("institute_name_en", form.institute_name_en);
      if (files.logo) localStorage.setItem("logo", previews.logo);
    } catch (err) {
      console.error(err);
      alert("Network or server error");
    }
  };

  // ---------------- SECTION TITLE ----------------
  const Section = ({ title }) => <h3 className="section-title">{title}</h3>;

  // ---------------- RENDER FORM ----------------
  return (
    <div className="main-content">
      <div className="breadcrumb">
        <a>Dashboard</a> <span>›</span>
        <a>Global Configuration</a> <span>›</span>
        Profile Setup
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data">

        {/* ===================== BASIC INFO ===================== */}
        <Section title="Basic Information" />
        <div className="form-row">
          <TextInput label="Institute Name (English)" name="institute_name_en" value={form.institute_name_en} onChange={handleInput} placeholder="Enter English name" required />
          <TextInput label="Institute Name (Bangla)" name="institute_name_bn" value={form.institute_name_bn} onChange={handleInput} placeholder="Enter Bangla name" required />
        </div>
        <div className="form-row">
          <TextInput label="Institute Meta Title" name="meta_title" value={form.meta_title} onChange={handleInput} placeholder="Enter Meta title" required />
          <TextInput label="NU Code" name="nu_code" value={form.nu_code} onChange={handleInput} placeholder="Enter NU Code" />
        </div>
        <div className="form-row">
          <TextInput label="Short Code" name="short_code" value={form.short_code} onChange={handleInput} placeholder="Enter short code" />
          <TextInput label="College Code" name="college_code" value={form.college_code} onChange={handleInput} placeholder="Enter college code" />
          <TextInput label="EIN Number" name="ein_number" value={form.ein_number} onChange={handleInput} placeholder="Enter EIN number" />
        </div>
        <div className="form-row">
          <div className="form-group">
            <label>Institute Type <span className="text-red">*</span></label>
            <select name="institute_type" value={form.institute_type ?? ""} onChange={handleInput} required>
              <option value="">Select</option>
              <option>Primary School</option>
              <option>School</option>
              <option>College</option>
              <option>University</option>
            </select>
          </div>
          <TextInput label="Masking" name="masking" value={form.masking} onChange={handleInput} placeholder="Enter masking" />
        </div>

        {/* ===================== WEB & SOCIAL LINKS ===================== */}
        <Section title="Web & Social Links" />
        <div className="form-row">
          <TextInput label="Website Link" name="website_link" value={form.website_link} onChange={handleInput} placeholder="https://example.com" />
          <TextInput label="Facebook Link" name="facebook_link" value={form.facebook_link} onChange={handleInput} placeholder="https://facebook.com/page" />
        </div>
        <div className="form-row">
          <TextInput label="YouTube Link" name="youtube_link" value={form.youtube_link} onChange={handleInput} placeholder="https://youtube.com/channel" />
          <TextInput label="Webmail Link" name="webmail_link" value={form.webmail_link} onChange={handleInput} placeholder="Webmail URL" />
        </div>

        {/* ===================== CONTACT ===================== */}
        <Section title="Contact Information" />
        <div className="form-row">
          <TextInput label="Contact Person" name="contact_person" value={form.contact_person} onChange={handleInput} placeholder="Enter contact person" required />
          <TextInput label="Mobile No" name="mobile_no" value={form.mobile_no} onChange={handleInput} placeholder="Enter mobile number" required />
          <TextInput label="Phone No" name="phone_no" value={form.phone_no} onChange={handleInput} placeholder="Enter phone number" />
        </div>
        <div className="form-row">
          <TextInput label="Web Contact No" name="web_contact_no" value={form.web_contact_no} onChange={handleInput} placeholder="Web contact number" />
          <TextInput label="Email" type="email" name="email" value={form.email} onChange={handleInput} placeholder="example@email.com" required />
          <TextInput label="Fax" name="fax" value={form.fax} onChange={handleInput} placeholder="Fax number" />
        </div>
        <TextArea label="Address" name="address" value={form.address} onChange={handleInput} placeholder="Enter full address" required />

               {/* ===================== MISSION ===================== */}
        <Section title="Mission" />
        <TextArea label="Mission Message" name="mission_msg" value={form.mission_msg} onChange={handleInput} placeholder="Mission Message"/>

        <div className="form-row">
          <FileInput label="Mission Image" name="mission_img" accept="image/*" preview={previews.mission_img} onFileSelect={handleFile} />
          <FileInput label="Mission Msg Image" name="mission_msg_img" accept="image/*" preview={previews.mission_msg_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== VISION ===================== */}
        <Section title="Vision" />
        <TextArea label="Vision Message" name="vision_msg" value={form.vision_msg} onChange={handleInput} placeholder="Vision Message"/>

        <div className="form-row">
          <FileInput label="Vision Image" name="vision_img" accept="image/*" preview={previews.vision_img} onFileSelect={handleFile} />
          <FileInput label="Vision Msg Image" name="vision_msg_img" accept="image/*" preview={previews.vision_msg_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== APPROACH ===================== */}
        <Section title="Approach" />
        <TextArea label="Approach Message" name="approach_msg" value={form.approach_msg} onChange={handleInput} placeholder="Approach Message"/>

        <div className="form-row">
          <FileInput label="Approach Image" name="approach_img" accept="image/*" preview={previews.approach_img} onFileSelect={handleFile} />
          <FileInput label="Approach Msg Image" name="approach_msg_img" accept="image/*" preview={previews.approach_msg_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== ABOUT ===================== */}
        <Section title="About Us" />
        <TextArea label="About Message" name="about_msg" value={form.about_msg} onChange={handleInput} placeholder="About Message"/>

        <div className="form-row">
          <FileInput label="Welcome Image" name="welcome_img" accept="image/*" preview={previews.welcome_img} onFileSelect={handleFile} />
          <FileInput label="About Image" name="about_img" accept="image/*" preview={previews.about_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== PRINCIPAL ===================== */}
        <Section title="Principal" />
        <div className="form-row">
          <TextInput label="Principal Name" name="principal_name" value={form.principal_name} onChange={handleInput} placeholder="Principal name"/>
          <TextArea label="Principal Message" name="principal_msg" value={form.principal_msg} onChange={handleInput} placeholder="Principal Message"/>
        </div>

        <div className="form-row">
          <TextInput label="Principal Label" name="principal_label" value={form.principal_label} onChange={handleInput} placeholder="Principal Label"/>
          <TextInput label="Principal Placeholder" name="principal_placeholder" value={form.principal_placeholder} onChange={handleInput} />
        </div>

        <div className="form-row">
          <FileInput label="Principal Image" name="principal_img" accept="image/*" preview={previews.principal_img} onFileSelect={handleFile} />
          <FileInput label="Principal Says Image" name="principal_says_img" accept="image/*" preview={previews.principal_says_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== VICE PRINCIPAL ===================== */}
        <Section title="Vice Principal" />
        <div className="form-row">
          <TextInput label="Vice Principal Name" name="vp_name" value={form.vp_name} onChange={handleInput} placeholder="Vice Principal Name"/>
          <TextArea label="Vice Principal Message" name="vp_msg" value={form.vp_msg} onChange={handleInput} placeholder="Vice Principal Message"/>
        </div>

        <div className="form-row">
          <TextInput label="Vice Principal Label" name="vp_label" value={form.vp_label} onChange={handleInput} placeholder="Vice Principal Label"/>
          <FileInput label="Vice Principal Image" name="vp_img" accept="image/*" preview={previews.vp_img} onFileSelect={handleFile} />
          <FileInput label="VP Says Image" name="vp_says_img" accept="image/*" preview={previews.vp_says_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== PERSON ONE ===================== */}
        <Section title="Person One" />
        <TextArea label="Person One Message" name="person_one_msg" value={form.person_one_msg} onChange={handleInput} placeholder="Person Message"/>

        <div className="form-row">
          <TextInput label="Person One Label" name="person_one_label" value={form.person_one_label} onChange={handleInput} placeholder="Person Level"/>
          <FileInput label="Person One Image" name="person_one_img" accept="image/*" preview={previews.person_one_img} onFileSelect={handleFile} />
          <FileInput label="Person One Says Image" name="person_one_says_img" accept="image/*" preview={previews.person_one_says_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== PERSON TWO ===================== */}
        <Section title="Person Two" />
        <TextArea label="Person Two Message" name="person_two_msg" value={form.person_two_msg} onChange={handleInput} placeholder="Person Message"/>

        <div className="form-row">
          <TextInput label="Person Two Label" name="person_two_label" value={form.person_two_label} onChange={handleInput} placeholder="Person Label"/>
          <FileInput label="Person Two Image" name="person_two_img" accept="image/*" preview={previews.person_two_img} onFileSelect={handleFile} />
          <FileInput label="Person Two Says Image" name="person_two_says_img" accept="image/*" preview={previews.person_two_says_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== RULES ===================== */}
        <Section title="Rules & Regulations (PDF Upload)" />
        <FileInput label="Rules PDF" name="rules_pdf" accept="application/pdf" preview={previews.rules_pdf} onFileSelect={handleFile} />

        {/* ===================== FOOTER & LOGO ===================== */}
        <Section title="Footer & Logo" />
        <TextArea label="Footer Caption" name="footer_caption" value={form.footer_caption} onChange={handleInput} placeholder="Footer Caption"/>

        <FileInput label="Institute Logo" name="logo" accept="image/*" preview={previews.logo} onFileSelect={handleFile} />

        {/* ===================== SIGNATURES ===================== */}
        <Section title="Signatures" />

        {["principal", "convener", "headmaster", "guide_teacher", "exam_controller"].map((r) => (
          <div className="form-row" key={r}>
            <TextInput label={`${r.replace("_", " ").toUpperCase()} Name`} name={`${r}_name`} value={form[`${r}_name`]} onChange={handleInput} placeholder="Name"/>
            <FileInput label={`${r.replace("_", " ").toUpperCase()} Signature`} name={`${r}_signature`} accept="image/*" preview={previews[`${r}_signature`]} onFileSelect={handleFile} />
          </div>
        ))}

        {/* ===================== HEADER IMAGE ===================== */}
        <Section title="Header Configuration" />

        <div className="form-row">
          <div className="form-group">
            <label>Show Header</label>
            <select name="show_header" value={form.show_header ?? "Off"} onChange={handleInput}>
              <option value="Off">Off</option>
              <option value="On">On</option>
            </select>
          </div>

          <FileInput label="Header Image" name="header_img" accept="image/*" preview={previews.header_img} onFileSelect={handleFile} />
        </div>

        {/* ===================== STATS ===================== */}
        <Section title="Institute Stats" />
        <div className="form-row">
          <TextInput label="Total Buildings" name="total_building" type="number" value={form.total_building} onChange={handleInput} />
          <TextInput label="Founded Year" name="founded_year" type="number" value={form.founded_year} onChange={handleInput} />
        </div>

        {/* SUBMIT BUTTON */}

        <button type="submit" className="btn-submit">Save</button>
      </form>
    </div>
  );
};

export default ProfileSetup;
