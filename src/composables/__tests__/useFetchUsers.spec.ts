import { afterEach, describe, expect, test, vi } from "vitest";
import { ref } from "vue";
import { User } from "../../types/user";
import { useFetchUsers } from "../useFetchUsers";
import axios from 'axios'

vi.mock('axios')

const mockUsers: User[] = [{
    id: 1,
    name: 'ana',
    email: 'ana@gmail.com'
}]

describe("useFetchUsers", () => {
  test("Get all users", async () => {
    const { users, loading, getUsers } = useFetchUsers();
    (axios.get as any).mockResolvedValue({
        data: mockUsers
    })
    await getUsers()
    // expect(axios.get).toHaveBeenCalled()
    // expect(axios.get).toHaveBeenCalledWith('https://jsonplaceholder.typicode.com/users')
    expect(users.value).toHaveLength(1)
    expect(loading.value).toBe(false)
  });
});


afterEach(() => {
  vi.restoreAllMocks()
})