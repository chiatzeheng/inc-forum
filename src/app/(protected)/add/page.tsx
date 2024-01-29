import { api } from '@/trpc/server';
import { useState } from 'react'

const page= () => {
    const [formData, setFormData] = useState({
        title: '',
        content: ''
    });

    const { data: mutate } = await api.post.createNewQuestion.mutation 

    const handleChange = (e: any) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const { data } = await mutate({ formData.title, formData.content});
            console.log('Post created:', data.postQuestion);
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };

    return (
        <div>
        <h1>Create a Post</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Content:</label>
                <textarea
                    name="content"
                    value={formData.content}
                    onChange={handleChange}
                    required
                ></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    );
}

export default page;