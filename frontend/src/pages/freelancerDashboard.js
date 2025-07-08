import React from 'react';
import '../freelancerStyles.css';

export default function FreelancerDashboard() {
    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());
        console.log('Submitted:', data);
    };
    
    return (
        <div className="form-container">
        <h2>Freelancer Profile</h2>
        <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input name="name" type="text" />

            <label>Email</label>
            <input name="email" type="email" />

            <label>Phone</label>
            <input name="phone" type="text" />

            <label>Address</label>
            <input name="address" type="text" />

            <label>Skill</label>
            <input name="skill" type="text" />

            <label>Specialization</label>
            <input name="specialization" type="text" />

            <label>Experience (Years)</label>
            <input name="experience_years" type="number" />

            <label>Resume URL</label>
            <input name="resume_url" type="url" />

            <label>Role</label>
            <select name="role" defaultValue="freelancer">
            <option value="freelancer">Freelancer</option>
            <option value="contractor">Contractor</option>
            <option value="manager">Manager</option>
            </select>

            <label>Status</label>
            <select name="status" defaultValue="active">
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
            </select>

            <label>Notes</label>
            <textarea name="notes" rows="3" />

            <label>Contractor ID (UUID)</label>
            <input name="contractor_id" type="text" />

            <div className="button-group">
            <button type="reset">Reset</button>
            <button type="submit">Submit</button>
            </div>
        </form>
        </div>
    )
}