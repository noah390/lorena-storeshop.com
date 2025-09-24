// Supabase configuration
const SUPABASE_URL = 'https://your-project-id.supabase.co';
const SUPABASE_ANON_KEY = 'your-anon-key-here';

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Database operations
const SupabaseAPI = {
    // Products
    async getProducts() {
        const { data, error } = await supabaseClient
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
        if (error) throw error;
        return data;
    },

    async addProduct(product) {
        const { data, error } = await supabaseClient
            .from('products')
            .insert([product])
            .select();
        if (error) throw error;
        return data[0];
    },

    async updateProduct(id, updates) {
        const { data, error } = await supabaseClient
            .from('products')
            .update(updates)
            .eq('id', id)
            .select();
        if (error) throw error;
        return data[0];
    },

    async deleteProduct(id) {
        const { error } = await supabaseClient
            .from('products')
            .delete()
            .eq('id', id);
        if (error) throw error;
    },

    // Admin authentication
    async loginAdmin(email, password) {
        const { data, error } = await supabaseClient
            .from('admin_users')
            .select('*')
            .eq('email', email)
            .eq('password', password)
            .single();
        if (error) throw error;
        return data;
    },

    // Image upload
    async uploadImage(file, fileName) {
        const { data, error } = await supabaseClient.storage
            .from('product-images')
            .upload(fileName, file);
        if (error) throw error;
        
        const { data: { publicUrl } } = supabaseClient.storage
            .from('product-images')
            .getPublicUrl(fileName);
        
        return publicUrl;
    }
};