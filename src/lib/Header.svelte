<script lang="ts">
    import { Link } from 'svelte-navigator';
</script>


<header class="apodHeader">
    <nav>
        <ul>
            <li><Link to="/" style="color: white;">Home</Link></li>
            <li><Link to="/test" style="color: white;">Test</Link></li>
        </ul>
    </nav>
</header>

<style>
    .apodHeader nav {
        background-color: rgba(0,0,0, 0.5);
    }

    .apodHeader ul {
        display: flex;
        
        margin: 0;
        padding: 2rem;
    }

    .apodHeader li {
        text-decoration: none;
        list-style: none;

        margin: 0 12px 0 12px;

        font-size: 1.2rem;
    }

</style>